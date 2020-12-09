# System and Unit Test Report

> Kahzum Logistical Delivery Platform  
> 12/7/20

## System Unit Test Scenarios

**Note**: we actually ended up completing some future-level user stories on accident while trying to complete the critical ones below. Those stories are in the project scope document, but not listed below.

### Small business flow

_Sprint 1:_

- As a small business owner I want to be able to easily let Kahzum know I have orders so that they can send a driver to pick stuff up.

_Sprint 2:_

- As a small business I want to be able to save my daily orders and see confirmation that it was saved successfully so I can show a driver that I have a/an order(s) to pick up.
- As a small business owner, I want to be able to see my order status for today so that I know when to expect pickup/delivery.

_Sprint 3_

- As a small business owner, I want to be able to see my order history so that I have peace of mind regarding my deliveries.

**Scenario**

1. Go to my.kahzum.com. A login page should appear showing sign-in with Google.
2. Click "sign in with google" and a sign-up page should appear.
3. Enter business information into the sign-up page and click "save".
4. The Today's Orders page should be showing. The top tells the business owner when to expect pickup/delivery.
5. Enter an order or order(s) into the boxes below the description and click "Save Today's Orders". A snackbar should pop up saying that the orders have been saved successfully.
6. Once orders have been delivered, click on the hamburger menu in the top left and click on "order history".
7. The table should show the orders that have been successfully delivered with a picture confirmation and the info of the driver that delivered it.

### Driver flow

_Sprint 1:_

- As a driver I want to be routed to every destination I need to go so there is no confusion/ambiguity in where I need to go or the best way to get there.

_Sprint 2:_

- As a driver I want to be able to get on the road as fast as possible once I have picked up all of my orders for the day (i.e. easily process that I have successfully picked up the packages) so that I can minimize the time I spend delivering.
- As a driver I want to be able to easily confirm that the order has been delivered so that I am not held liable for failure to deliver.

_Sprint 3:_

- As a driver I want to quickly move to the next destination after the order picture has been delivered so that I can minimize time spent on delivery.

_Sprint 4_

- As a driver, I want to be able to finish multiple orders to one house with one text.

**Scenario**

1. Before 1pm, an already preregistered driver should text "check-in" by texting "checkin" to the twilio number.
2. At 1pm, the driver will recieve a list of addresses telling them where they will be going for pickups and dropoffs for that day.
3. When the driver is ready to begin their route, they should text "on my way" to get directions for their route.
4. When a driver texts pickup, they should recieve a confirmation text saying that they have successfully picked up an order (or potentially multiple orders).
5. When a driver texts "dropoff" with an image, they should get confirmation that they have successfully performed a dropoff.
6. When the driver is done for the day, they should get a text telling them that their route is finished.

### Customer flow

_Sprint 3_

- As a customer I want to know when my package is on it’s way and when it will arrive so I know how to time my day to make sure I get the delivery.
- As a customer I want to be notified when my package has arrived so I know to go outside and check for it.

**Scenario**

1. A customer places an order at a small business.
2. The recieve a text with a picture of their order on their porch later that day.

### Kahzum flow

- As Kahzum I want to make sure to keep track of order information for future optimization.
- As Kahzum I want to keep track of deliveries for some half life to ensure that the delivery can’t be disputed.
- As Kahzum, I want to make sure that many drivers can get assigned from many localities.

**Scenario**

1. A driver begins with the normal driver flow.
2. When an order is "dropped off" by a driver, it is moved from "pending-orders" to "completed-orders" so that the time of delivery is recorded as well as all the meta information.

## Unit tests (25 points):

See the `Testing` file in this same folder
