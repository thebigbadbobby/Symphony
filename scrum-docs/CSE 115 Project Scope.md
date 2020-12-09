**Project Vision:** The logistical tool will allow for drivers to get scheduled to businesses and have a seamless pickup and dropoff process that allows for driving to be easy, and guarantee delivery for the end user and the small business.

**User Stories (for scoped, see below - these are pre-lecture so the format isn’t quite right, see below this section)**

A small business owner wants to be able to easily let Kahzum know they have orders.

A small business owner wants to know that their order has been successfully delivered to their customer.

A small business owner wants to know if their order could not be delivered and what to do in that case.

A small business owner wants to prove to customers that the package was delivered potentially far after the delivery.

A driver wants to know how much time they are committing to before they commit.

A driver wants to know how much they will get paid for delivering orders.

A driver wants to be able to easily pick up from small businesses that they are assigned to.

A driver wants to minimize the amount of driving that they have to do.

As a driver I want to know how many packages they will be picking up and from what businesses.

A driver wants to be routed to every destination they need to go so there is no confusion.

A driver wants to be able to get on the road as fast as possible once they have picked up all of their orders for the day.

A driver wants to make sure that the address they are going to deliver to is actually an address that is found on the map.

A driver wants to be able to easily confirm that the order has been delivered.

A driver wants to quickly move to the next destination after the order picture has been delivered.

Kahzum wants to make sure to keep track of order information for future optimization.

Kahzum wants to keep track of deliveries for some half life to ensure that the delivery can’t be disputed.

Kahzum wants to make sure the data is anonymized (for security reasons).

A customer wants to know when their package is on it’s way and when it will arrive so they know.

As a customer I want to be notified when my package has arrived so I know to go outside and check for it.

**Current Setup:**

Currently, Thursday, Friday, Saturday at 3:15, I have an iphone shortcut that texts the small business owners with a message that says basically "Hi, this is Mason from kahzum. Do you have any deliveries for me to pick up today?". The small business owner answers with a text “yes” or “no”. Then I go pick up the stuff from the small business, go back to my car, take a picture of the label, and then enter the address into the route organizer application. Hopefully, it works and gives me a google map link to correct addresses. If it does, then I get directions that way, otherwise, I do it manually.

Once I get to a house, I drop off the package, take a picture of it, go back to my car, look at the picture I took from earlier, type in the phone number from the picture, send them a text with a picture and a message, then send a picture to the small business owner, then send a picture to Bobby (so he can manually enter it into a Google spreadsheet).

Then I switch back to the google maps app and resume my route.

**User Stories (ordered and scoped - There is overhead that is not accounted for here)**

Used in:

<div style="color: blue">first sprint, </div>

<div style="color: red">second sprint,</div>

<div style="color: green">third sprint,</div>

<div style="color: orange">fourth sprint</div>  
<br>

**Small business:**

_CSE 115:_

1. <div style="color: blue">As a small business owner I want to be able to easily let Kahzum know I have orders so that they can send a driver to pick stuff up. - Medium - 13</div>

2. <div style="color: red">As a small business owner I want to know that my order has been successfully delivered to my customer for peace of mind. - Easy - 5</div>

3. <div style="color: red">As a small business owner I want to know if my order could not be delivered and what to do in that case so that I can get it back and handle it myself. - Easy - 5 </div>

_Future?:_

1. As a small business owner I want to prove to customers that the package was delivered, potentially far after the delivery to ensure that I don’t lose money because the customer lost the package.

2. As a small business owner, I want to know whether my "local" order is too far away for Kahzum to deliver.

3. As a small business I want to make sure that the address entered is verified in some way so that I don’t make a typo that causes the delivery to fail.

**Drivers:**

_CSE 115:_

1. <div style="color: blue">As a driver I want to be routed to every destination I need to go so there is no confusion/ambiguity in where I need to go or the best way to get there. - Medium - 20</div>

2. <div style="color: red">As a driver I want to be able to get on the road as fast as possible once I have picked up all of my orders for the day (i.e. easily process that I have successfully picked up the packages) so that I can minimize the time I spend delivering. - Medium - 13</div>

3. <div style="color: red">As a driver I want to be able to easily confirm that the order has been delivered so that I am not held liable for failure to deliver. - Medium - 13</div>

4. <div style="color: green">As a driver I want to quickly move to the next destination after the order picture has been delivered so that I can minimize time spent on delivery. - Easy - 3</div>

_Future?:_

1. A driver wants to minimize the amount of driving that they have to do.

2. A driver wants to make sure that the address they are going to deliver to is actually an address that is found on the map.

3. A driver wants to know how many packages they will be picking up and from what businesses.

4. A driver wants to know how much they will get paid for delivering orders.

5. A driver wants to know how much time they are committing to before they commit.

6. A driver wants to be able to easily pick up from small businesses that they are assigned to.

**Kahzum:**

_CSE 115:_

1. <div style="color: orange">As Kahzum I want to make sure to keep track of order information for future optimization. - 5 Easy/medium </div>

2. <div style="color: orange">As Kahzum I want to keep track of deliveries for some half life to ensure that the delivery can’t be disputed. - 5 Easy/medium </div>

_Future?:_

1. As Kahzum I want to make sure the data is anonymized so that it’s not devastating if we get hacked.

**Customer:**

_CSE 115:_

1. <div style="color: green">As a customer I want to know when my package is on it’s way and when it will arrive so I know how to time my day to make sure I get the delivery. - 8 - Medium</div>

2. <div style="color: green">As a customer I want to be notified when my package has arrived so I know to go outside and check for it. - 3 Easy</div>

_Future?:_

1. As a customer I want to be able to see where the package is as it’s on its way, in real time on a map so I know exactly when I can expect it to arrive.

Schedule:

- Minimal product - UI

  - Small business enter ui

  - Small business login

  - Driver login

  - Driver clockin??

  - Driver generate today’s route

  - Driver confirm pickup

  - Driver confirm dropoff

  - Driver clockout??

- Core functionality

  - Small business can enter their info

  - Routing gives driver correct route, ahead of time.

  - Notifies customer, small business owner, and saves delivery time to db when the driver clicks some button for successfully/unsuccessfully delivered

## Sprint 1 (little overhead/first exploration/setup)

- As a small business owner I want to be able to easily let Kahzum know I have orders so that they can send a driver to pick stuff up. - Medium - 13

  - Determine UI Framework and install it

  - Build a simple frontend with router logic to show custom information to business owners based on account

  - Setup backend to communicate with DB

  - Setup Oauth for google login

  - Get the site hosted and the server up and running

- As a driver I want to be routed to every destination I need to go so there is no confusion/ambiguity in where I need to go or the best way to get there. - Medium - 20

  - Setup Oauth for google login

  - Routing to determine if driver or business and show different pages

  - Simple driver ui to display addresses entered (for now, mainly just hooking up frontend and backend again)

  - Look at current routing software and openrouteservice api

- Misc tasks that don’t have a story but need to be a part of this sprint to get the ball rolling

  - Research into twilio and how to use that api

  - Build wireframes to help define user flow

## Sprint 2 (require foundations, but still setup)

- As a driver I want to be able to get on the road as fast as possible once I have picked up all of my orders for the day (i.e. easily process that I have successfully picked up the packages) so that I can minimize the time I spend delivering. - Medium - 13

  - Handling routing

  - the driver workflow frontend UI update

- As a driver I want to be able to easily confirm that the order has been delivered so that I am not held liable for failure to deliver. - Medium - 13

  - Twilio api addition into backend

- As a small business owner I want to know that my order has been successfully delivered to my customer for peace of mind. - Easy - 5

  - Either a) update small business owner frontend or b) send the small business owner a text (requires twilio)

- As a small business owner I want to know if my order could not be delivered and what to do in that case so that I can get it back and handle it myself. - Easy - 5

  - Twilio send text to small business owner to notify

  - Update frontend UI to show error

## Sprint 3: End customer Centric

- As a customer I want to know when my package is on it’s way and when it will arrive so I know how to time my day to make sure I get the delivery. - 8 - Medium

  - Connect driver "confirming pickup" with customer delivery notification - Probably twilio

- As a customer I want to be notified when my package has arrived so I know to go outside and check for it. - 3 Easy

  - Connect driver "confirm dropoff" button to sending notification via twilio

- As a driver I want to quickly move to the next destination after the order picture has been delivered so that I can minimize time spent on delivery. - Easy - 3

  - Once confirmed, figure out routing

## Sprint 4 (finalization and less critical tasks - room for bug fixes)

- As Kahzum I want to make sure to keep track of order information for future optimization. - 5 Easy/medium

  - Handle best way to "save" information for data viz

- As Kahzum I want to keep track of deliveries for some half life to ensure that the delivery can’t be disputed. - 5 Easy/medium

  - Best way to "save" information in DB so it is easily referenceable, but purged to anonymized after certain half life
