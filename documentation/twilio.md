# Docs for the Twilio API

## Phone Numbers:

### Production:

- +14302390178

### Dev:

- +14085210010

## Production Scripts

- **twilio-prod**: Runs the production phone number for twilio
- **prod**: Runs twilio and the backend server (called when docker container starts)

## Development Scripts

- **twilio-dev**: Runs the dev phone number for twilio
- **dev**: Runs the frontend and backend and twilio concurrently
- **update**: Updates the frontend and backend from package.json via npm installs
- **kill**: kills all node processes (helpful if you get the port in use error)

## Docker

- **Run docker container** `docker-compose up -d`

## API

### Helper functions

`deliverResponse(res: responseObject, twiml: twilio response)`

- Simply delivers messages after the body has been set

`getRouteInfoFromTodaysRoute(todaysRoute: todaysRouteObject)`

- Helper function that takes a "today's routes" object and looks through the route populating it with business info and order info.

`getPickupBusinessName(todaysRoute: todaysRouteObject)`

- Helper function that gets the business name from the today's route object

`isDriverDone(driver: DBDriver)`

- Helper function for determining if the driver is done with their route.

`resetDriverState(driver: DBDriver)`

- Helper function for resetting the driver's state once they have finished their last order for the day

### Main Twilio functions

`handleCheckin(driver: DBDriver, res: responseObject, message: twilioMessageObject, twiml: twilio response)`
This function essentially takes the the driver and changes their state to checkin so they can be included in the routing script.

- Called first in the order

- **NOTE:** does not handle the case where the driver tries to check in _AFTER_ the route has been calculated

`handleOnWay(driver: DBDriver, res: responseObject, message: twilioMessageObject, twiml: twilio response)`
Makes sure that the driver is in the ready state, and if they are, if finds their maps urls and sends them to them so they can start delivering.

- Called third in the order

`handlePickup(driver: DBDriver, res: responseObject, message: twilioMessageObject, twiml: twilio response)`
Makes sure the driver is on their way, and as long as they are, it updates their progress and lets them know

- Called fourth (and potentially many other times after that) in the order

`handleDropoff(driver: DBDriver, res: responseObject, message: twilioMessageObject, twiml: twilio response)`
This function essentially takes in the body of the incoming text request and fetches the driver by their phone number, the business, and the latest order and sends a message and image to the customer, sets the order to completed, then sends a confirmation message to the driver.

- Called always after a pickup and is the last thing called for a driver's route

- Currently handles the following edge cases:
  - There are no orders
  - There is no business
  - There is no driver (prompts them to sign up at kahzum.com)
  - Generic order failure message for if the complete-order endpoint fails

## Testing

Currently using `*.http` files to test, may add jest files in the future. These `*.http` files have some "gotchas"

- They are in EXACTLY the following format:
  Example with post:

  ```
  POST http://localhost:5000/twilio/sms
  Content-Type: application.json

  content

  ###
  ```

- Headers are case-insensitive
- The `###` at the end tells it that is the end of the request
- The `content` can be a json object, but it MUST have a newline above and below it
- The `POST` part can be changed to whatever the request is
- You MUST include the `http://` at the beginning of the request
- Each header must be seperated by a newline
- Inside the json object, you CANNOT have a trailing comma. I.e. {"temp": "temp",} will fail because of the trailing comma

# Run \*.http files:

Use this VSCode extension, then click the little "send request" button at the top of each
http request: https://marketplace.visualstudio.com/items?itemName=humao.rest-client

## Example Request

- [Text to Twilio (img)](https://slack-files.com/T01CPEMJTQ8-F01DRRCPD0D-806de74de9)
- [Response (part 1)](https://slack-files.com/T01CPEMJTQ8-F01DRRDRHCM-14b0f24aeb)
- [Response (part 2)](https://slack-files.com/T01CPEMJTQ8-F01DUU0KQQ2-af6a6d6285)

## Helpful Resources

- [Visualization on figma](https://www.figma.com/file/zszkGdNiYM4jNMJjEo6oDw/Kahzum-app?node-id=243%3A2)
- [Store images in MongoDB](https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d)
- [Send/recieve images from Twilio MMS](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-download-images-incoming-mms-node)
