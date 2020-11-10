# Docs for the python route calculation script
### This python script is used dicide the best way to divide orders between drivers. Also what is the best route/order to deliver orders.
# Usage 
## `$ python routeCalculation [inputfile.json]`

### A `inputfile.json` should look like this. Currently all `inputfile.json` are saved under `\kahzum-app\routing\dailyDestinationList\`
```
{
    "DriverInfo": [{
        "startingLocation": "",
        "driverId": ""
    }],
    OrderInfo: [{
        "PickUpLocation":"",
        "DropOffLocation":"",
        "OrderId": "",
    }]
}
```
## Output

### The program does not print result to stdout or file system. But right now it invokes backend API /routing/saveRoutingOutput

### //TODO add args option to print to stdout/store result as a file.

```
{
    "routes": [{
        "driverId":"",
        "routeTime": 2054,
        "route": [
            {"address": "10101010101010 Fair st, Santa Cruz, CA", orderId: ""},
            {"address": "435 Front St, Santa Cruz, CA 95060", orderId: ""}, 
            {"address": "1148 soquel ave, Santa Cruz, CA 95062", orderId: ""},
            {"address": "183 chestnut st, Santa Cruz, CA 95060", orderId: ""},
            {"address": "710 College Ten Rd, Santa Cruz, CA 95064", orderId: ""}
            ]
    }], 
    "total_time": 2054
}
```