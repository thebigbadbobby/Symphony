from __future__ import print_function
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import json
import requests
import time
import sys

# global variable to store the API_KEY used during calls to open route service
API_KEY = ""

# load destination data for today's deliveries
# load from a text file
def get_input_info(filepath):
    with open(filepath) as file:
        data = json.load(file)
        return data

# use openrouteservice.org to get distance between all point of insterest
# currently we are getting geocode by sending each location one by one. This is very slow
def request_distance_data(locations):
    # make request to obtain the geocode of a address
    def get_geocode(address):
        # prepare request
        template = 'https://api.openrouteservice.org/geocode/search?api_key=' + API_KEY
        text = '&text=' + address

        # send request
        r = requests.get(template + text)
        if(r.status_code != 200):
            print(r.text)
            exit(1)

        # read results
        respondJson = json.loads(r.text)

        # print(address)

        # we are picking the first result when there's mulitple search result
        # need to improve in future
        # print(json.dumps(respondJson['features']))
        try:
            return respondJson['features'][0]["geometry"]["coordinates"]
        except:
            print('error parsing server response')
            print(template+text)
            print('response:' + json.dumps(respondJson))
            exit(1)

    def get_travel_time(geocodeList):
        # prepare request
        template = 'https://api.openrouteservice.org/v2/matrix/driving-car'
        headers = {"Authorization": API_KEY}  # XXX API key
        body = {"locations": geocodeList}  # XXX locations matrix

        # print(template+start+end)
        # send request
        r = requests.post(template, json=body, headers=headers)
        # print("test: status code is " + str(r.status_code))
        if(r.status_code != 200):
            print ("Unexpected status code!")
            print(r.text)
            return 10000000

        # read results
        respondJson = json.loads(r.text)

        # print(json.dumps(respondJson))

        if(respondJson):
            return respondJson['durations'] 
        else:
            print ("Error parsing response from openRouteService")
            print ("request:")
            print ( template + header + body)
            print ("responde:")
            print (json.dumps(respondJson))
            return 10000000  # XXX error

    # print("requesting geocodes...")
    
    geocodeList = []
    # calculate all driver geocodes
    for location in locations:
        geocodeList.append(get_geocode(location))

    # this data ojbect will continue be modified before it can be send into googleOR's function
    data = {}  # XXX initialization of object for googleOR
    data['distance_matrix'] = []


    # XXX calling get travel time, needs to input matrix
    data['distance_matrix'] = (get_travel_time(geocodeList))

    # Currently it has distance_matrix. We still need [number of vechicle, ]
    return data

# This function is not used in production. It could be helpful for debugging so it is not deleted
def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    total_distance = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        route_distance = 0
        while not routing.IsEnd(index):
            plan_output += ' {} -> '.format(manager.IndexToNode(index))
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        plan_output += '{}\n'.format(manager.IndexToNode(index))
        plan_output += 'Distance of the route: {}m\n'.format(route_distance)
        print(plan_output)
        total_distance += route_distance
    print('Total Distance of all routes: {}m'.format(total_distance))

# This function IS used in production. It takes in googleOR's results and pair each address with orderIDs. 
# Also it assign different route to each drivers(Identified by their driverIds)
# It also adds some extra information that could be useful in the future (i.e time estimation) 
def get_solution_obj(data, manager, routing, solution, addresses, driverIds, orderIds):
    """Prints solution to stdout in a better way"""
    solutionObj = {"routes": []}
    total_time = 0

    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        solutionObj["routes"].append({})
        solutionObj["routes"][vehicle_id] = {}
        solutionObj["routes"][vehicle_id]["driverId"] = driverIds[vehicle_id]
        route_time = 0
        stop_ids = []
        stops = []
        while not routing.IsEnd(index):
            stop_ids.append(manager.IndexToNode(index))
            # print('index:', index, 'node: ', manager.IndexToNode(index));
            stop = {}
            stop['address'] = addresses[manager.IndexToNode(index)]
            stop['orderId'] = orderIds[manager.IndexToNode(index)]
            stops.append(stop)
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_time += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        solutionObj["routes"][vehicle_id]['stop_ids'] = stop_ids
        solutionObj["routes"][vehicle_id]['route'] = stops
        solutionObj["routes"][vehicle_id]['routeTime'] = route_time
        total_time += route_time
    solutionObj["totalTime"] = total_time
    return solutionObj

# This function calls backend endpoint and stores the info
def saveSolutionToDB(solutionObj):
    # print(json.dumps(solutionObj))
    URL = 'http://localhost:5000/routing/saveRoutingOutput'
    textDriverUrl = 'http://localhost:5000/twilio/deliver-routes'

    r = requests.post(url=URL, json=solutionObj)
    # print(solutionObj)
    print('server respond', r.status_code)
    print('routing script end')


# Need to temporary collapse driver address with order address because
# we need the distance info between ALL point of interests
def process_distance_info(input_info, processed_data):
    driverInfos = input_info['driverInfo']
    processed_data['addresses'] = []
    processed_data['orderIds'] = []
    processed_data['driverIds'] = []
    processed_data['address'] = []
    
    for info in driverInfos:
        processed_data['addresses'].append(info['startLocation'])
        processed_data['driverIds'].append(info['driverId'])
        processed_data['orderIds'].append('')
    for Orderinfo in input_info['orderInfo']:
        processed_data['addresses'].append(Orderinfo['pick-up-location'])
        processed_data['orderIds'].append(Orderinfo['orderId'])

        processed_data['addresses'].append(Orderinfo['drop-off-location'])
        processed_data['orderIds'].append(Orderinfo['orderId'])

def main(argv):
    # load api key
    global API_KEY
    API_KEY = argv[2]
    
    input_info = get_input_info(argv[1])
    
    processed_data = {}
    
    process_distance_info(input_info, processed_data)
    # print(processed_data)

    data = request_distance_data(processed_data['addresses'])
    num_drivers = len(input_info['driverInfo'])

    data['starts'] = []
    data['ends'] = []
    data['num_vehicles'] = num_drivers # the amount of drivers

    # assume the driver will want to come back home
    for i in range(0,num_drivers):

        data['starts'].append(i)
        data['ends'].append(i)

    data['pickups_deliveries'] = []
    for i in range(num_drivers, len(processed_data['addresses']), 2):
        data['pickups_deliveries'] .append([i, i+1])
    # print(json.dumps(data))
    # exit(0)

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']),
                                           data['num_vehicles'], data['starts'], data['ends'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Define cost of each arc.
    def distance_callback(from_index, to_index):
        """Returns the manhattan distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        try:
            return data['distance_matrix'][from_node][to_node]
        except:
            print(from_node)
            exit(1)

    transit_callback_index = routing.RegisterTransitCallback(
        distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Distance constraint.
    dimension_name = 'Distance'
    routing.AddDimension(
        transit_callback_index,
        0,  # no slack
        300000,  # vehicle maximum travel distance
        True,  # start cumul to zero
        dimension_name)
    distance_dimension = routing.GetDimensionOrDie(dimension_name)
    distance_dimension.SetGlobalSpanCostCoefficient(100)

    # Define Transportation Requests.
    for request in data['pickups_deliveries']:
        pickup_index = manager.NodeToIndex(request[0])
        delivery_index = manager.NodeToIndex(request[1])
        routing.AddPickupAndDelivery(pickup_index, delivery_index)
        routing.solver().Add(
            routing.VehicleVar(pickup_index) == routing.VehicleVar(
                delivery_index))
        routing.solver().Add(
            distance_dimension.CumulVar(pickup_index) <=
            distance_dimension.CumulVar(delivery_index))

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PARALLEL_CHEAPEST_INSERTION)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Print solution on console.
    if solution:
        # print_solution(data, manager, routing, solution)
        solutionObj = get_solution_obj(
            data, manager, routing, solution, processed_data['addresses'], processed_data['driverIds'], processed_data['orderIds'])
        # print(json.dumps(solutionObj))
        saveSolutionToDB(solutionObj)


if __name__ == '__main__':
    main(sys.argv)
