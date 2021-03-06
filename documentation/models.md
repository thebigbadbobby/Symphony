# Models Documentation

### What is this?

This lays out the scheme for each of the models in mongoDB. This covers the "why" not the how. Look at the /models folder to see the "how"

### Business

### What does this represent:

This file represents the small businesses (the physical entity) in the database.

### The schema:

#### Current Fields:

- `businessName`
  - The name of the small business
- `businessPhone`
  - The phone number of the small business (this is typically the same as the owner phone number)
- `pickupAddress`
  - The address of the business most likely, but this allows us to pick up from wherever we need.
- `owners`
  - This is an array of all the owners of the small business. We do this to allow for multiple people to log in with their google account and still be editing the same stuff.
- `pickupTimes24hr`
  - This is an array representing a range of times (in military time). `pickupTimes24hr[0]` is the start time, `pickupTimes24hr[0]` is the end time.
- `locality`
  - So we know what drivers are allowed to be assigned there.

#### Desired fields:

- `cutoffTime`
  - So we can warn the small business owner what that time is and when they are beyond it (so we can't fullfill it that day)

## Completed Order

### What does this represent:

This file represents orders that have been delivered and are "history" so to speak.

### The schema:

#### Current Fields:

- `business`
  - The id of the business that "owns" this order. Every order should have a business that it is associated with.
- `driver`
  - The id of the driver that completed this order.
- `customer_name`
  - The name of the customer
- `customer_phone`
  - The phone number of the customer... used to send them a confirmation text
- `address`
  - The customer's address (aka the dropoff address)
- `imageUrl`
  - The image associated with the order (since every driver is required to take a picture for the order to be considered completed).
  - This is a link to twilio's servers because they store them forever which is pretty sick.

#### Desired fields:

- `locality`
  - So the routing script knows what's up and which orders to run

## Driver

### What does this represent:

This file represents the drivers in the database.

### The schema:

#### Current Fields:

- `fullName`
  - The full name of the driver, used to send messages to the customer.
- `phone`
  - The phone number of the driver (used to help find them typically)
  - This has to be in the format `xxx-xxx-xxxx`
- `email`
  - The driver's email. Not really used rn, but will be.
- `locality`
  - The driver's locality so we know their pickup "radius"
- `todaysRoute`
  - The driver's route for the day. Is set to null if the driver has not been assigned a route or is done for the day
    - An enum that currently only allows for `auburn` and `santa cruz`
- `startLocation`
  - The driver's start location indicating what address should be used when calculating their route.
- `state`
  - The state of the driver in their route. Has 4 options:
    - `idle`: the driver can't do anything except check in. They will not get assigned a route in this state.
    - `checkin`: the driver has checked in and is ready for a route.
    - `ready`: the driver has recieved their route but has not let us know that they have started it yet.
    - `onWay`: The driver is picking up/dropping off packages. When they are done with their route, their state will be reset to `idle`

#### Desired fields:

- None right now

## Owner

### What does this represent:

This file represents the Owner of the small business in the database.

### The schema:

#### Current Fields:

- `fullName`
  - The name of the owner
- `phone`
  - The owner's phone number so we can contact them (this may come in handy)
- `email`
  - The owner's email (that they used to log in with Google)

#### Desired fields:

- None at this time

## Pending Order

### What does this represent:

This file represents the orders that have been placed by a small business (but not fulfilled yet).

### The schema:

#### Current Fields:

- `business`
  - The name of the small business
- `customer_name`
  - The customer's name
- `customer_phone`
  - The customer's phone number, used to send confirmation texts
- `address`
  - The address of the customer (aka the dropoff location)

#### Desired fields:

- `locality`
  - So that the routing algorithm can run for each locality (and we aren't assigning a driver to a super far away business simply because they are the only one available)

## Personal Route

### What does this represent:

This file stores the optimized route for each driver every day.

### The schema:

#### Current Fields:

- `driverId`
  - The driver's ID number of which the route is for
- `route`
  - In-order places/addresses that the driver is going to follow for the day
- `routeTime`
  - Total time of going through the whole route
- `currentIndex` (This is poorly named)
  - The index in route representing the stop that the driver has just completed.
    - `currentIndex + 1` is the driver's next stop (index) in the route
- `started`
  - if the driver has started their route
- `completed`
  - if this route is completed route

#### Desired fields:

- None right now
