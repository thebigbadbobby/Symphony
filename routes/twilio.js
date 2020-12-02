/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const {
  sendMediaMsg, formatPhoneNumber, textCompare, sendMsg,
} = require('../twilio/helpers');
const Driver = require('../models/driver');
const Business = require('../models/business');
const PendingOrder = require('../models/pending_order');
const PersonalRoute = require('../models/personal_route');

dotenv.config();
const port = process.env.SERVER_PORT || 5000;

const router = express.Router();

/** Helper function that does all the 200 stuff to declutter the main functions */
const deliverResponse = (res, twiml) => {
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};

/** Helper function that takes a "today's routes" object and looks through the route
 * populating it with business info and order info.
 */
const getRouteInfoFromTodaysRoute = (todaysRoute) => {
  // NOTE: the first index is the driver's start location, so we slice it off.
  const driverRoute = todaysRoute.route.slice(1);
  // console.log('driver route', driverRoute);
  const promises = driverRoute.map((routeStop) => new Promise((resolve, reject) => {
    // Note: routeStop is an array of Maps, you need to use javascript map functions
    // to use the value
    PendingOrder.findById(routeStop.get('orderId')).populate('business').then((order) => resolve({ address: routeStop.get('address'), order })).catch(reject);
  }));

  return Promise.all(promises);
};

/** Helper function that gets the business name from the today's route object */
const getPickupBusinessName = async (todaysRoute) => {
  // let businessName = [];
  // todaysRoute.currentIndex 0 is drivers address
  const orderId = todaysRoute.route[todaysRoute.currentIndex === 0 ? 1 : todaysRoute.currentIndex].get('orderId');
  const order = await PendingOrder.findOne({ _id: orderId }).populate('business');
  const businessName = order.business.businessName;

  // TODO change to forEach when orderID property is an array
  // const orderIds = todaysRoute.route[1].get('orderId');
  // orderIds.forEach((orderId) => {
  //   PendingOrder.findOne({ _id: orderId }).populate('business')
  //     .then((order) => {
  //       businessName.push(order.business.businessName);
  //     });
  // });

  return businessName;
};

/** Helper function for determining if the driver is done with their route. */
const isDriverDone = async (driver) => {
  const todaysRoute = await PersonalRoute.findOne({ _id: driver.todaysRoute });
  return todaysRoute.currentIndex + 1 === todaysRoute.route.length;
};

/** Helper function for resetting the driver's state */
const resetDriverState = async (driver) => {
  // TODO: finish this function
  console.log('resetting the driver!', driver);
  driver.state = 'idle';
  driver.todaysRoute = null;
  driver.save();
};

/**
 * @description Handles the checkin for the driver, driver state should become 'checkin'
 * @param {@Object} driver - the driver from the DB
 * @param {@Object} res - the response object that allows you to send
 * @param {@Object} message - the message object to send
 * @param {@Object} twiml - TODO: WTF is this?
 * @returns {boolean} - if it was a success or not
 */
const handleCheckin = async (driver, res, message, twiml) => {
  if (driver.state !== 'idle') {
    message.body('You already checked in');
    deliverResponse(res, twiml);
    return false;
  }

  // TODO: (Future) make sure that the driver has not checked in too late (how do we do this?)

  // eslint-disable-next-line no-param-reassign
  driver.state = 'checkin';
  driver.save();
  message.body('Thanks for checking in! We will send you your route at 1:30 pm');
  deliverResponse(res, twiml);
  return true;
};

/**
 * @description Handles the "on way" text from the driver
 * @param {@Object} driver - the driver from the DB
 * @param {@Object} res - the response object that allows you to send
 * @param {@Object} message - the message object to send
 * @param {@Object} twiml - TODO: WTF is this?
 * @returns {boolean} - if it was a success or not
 */
const handleOnWay = async (driver, res, message, twiml) => {
  if (driver.state !== 'ready') {
    if (driver.state === 'idle' || driver.state === 'checkin') {
      message.body(driver.state === 'idle' ? 'You have not checked in yet' : 'Please wait until you have recieved directions');
      deliverResponse(res, twiml);
      return false;
    }
    message.body('Seems like you are already enroute.');
    deliverResponse(res, twiml);
    return false;
  }
  const mapUrlArray = await axios.get(`http://localhost:${port}/routing/routeUrl`, {
    params: {
      driverId: driver._id,
    },
  });
  let mapUrlString = '';
  mapUrlArray.data.forEach((mapUrl) => {
    mapUrlString += `${mapUrl}\n`;
  });
  const todaysRoute = await PersonalRoute.findOne({ _id: driver.todaysRoute });
  const route = await getRouteInfoFromTodaysRoute(todaysRoute);
  let msg = `Great! Here is your route: \n${mapUrlString}\n`;
  msg += 'In general, text pickup when you pick up orders and “dropoff” and an image when you dropoff orders.\n';
  msg += `For now, text: “pickup” after you have picked up your order(s) from ${route[0].order.business.businessName}`;
  // eslint-disable-next-line no-param-reassign
  driver.state = 'onWay';
  driver.save().then(() => {
    message.body(msg);
    deliverResponse(res, twiml);
  }).catch((err) => {
    message.body('Something wen\'t wrong when we were trying to update our on-way state... maybe try telling us again?');
    deliverResponse(res, twiml);
    console.warn("Couldn't update drivers state in 'OnWay' function", err);
  });
  return true;
};

/**
 * @description Handles the "on way" text from the driver
 * @param {@Object} driver - the driver from the DB
 * @param {@Object} res - the response object that allows you to send
 * @param {@Object} message - the message object to send
 * @param {@Object} twiml - TODO: WTF is this?
 * @returns {boolean} - if it was a success or not
 */
const handlePickup = async (driver, res, message, twiml) => {
  if (driver.state !== 'onWay') {
    message.body('You have not started today\'s route yet');
    deliverResponse(res, twiml);
    return false;
  }

  const todaysRoute = await PersonalRoute.findOne({ _id: driver.todaysRoute });
  const businessName = await getPickupBusinessName(todaysRoute);
  try {
    await axios.post(`http://localhost:${port}/routing/update-progress`, {
      id: driver._id,
    });
  } catch (err) {
    console.log("Couldn't update progress", err);
    message.body("We couldn't update your progress. If this happens multiple times, continue on your route.");
    deliverResponse(res, twiml);
    return false;
  }
  message.body(`Pickup recorded for ${businessName}.`);
  deliverResponse(res, twiml);
  return true;
};

/**
 * @description Handles marking the order as completed and texting the customer
 * @param {Object} twilioReq
 * @returns {boolean}
 */
const handleDropoff = async (twilioReq, message, driver, twiml, res) => {
  if (driver.state !== 'onWay') {
    message.body('You have not picked up any orders yet');
    deliverResponse(res, twiml);
    return false;
  }
  // if we have an image
  if (twilioReq.NumMedia !== '0' && twilioReq.MediaUrl0) {
    const todaysRoute = await PersonalRoute.findOne({ _id: driver.todaysRoute });

    // "Body" is the text, "MediaUrl0" is the image
    // TODO: does this ever get called?
    if (todaysRoute.currentIndex + 1 === todaysRoute.route.length) {
      message.body("Looks like you don't have any orders left to dropoff. Let us know if this is an error!");
      deliverResponse(res, twiml);
      return false;
    }

    const currentOrderId = todaysRoute.route[todaysRoute.currentIndex === 0 ? 1 : todaysRoute.currentIndex].get('orderId');

    let latestOrder;
    let business;
    const imageUrl = twilioReq.MediaUrl0;
    try {
      latestOrder = await PendingOrder.findById(currentOrderId);
      business = await Business.findById(latestOrder.business);
      await axios.post(`http://localhost:${port}/driver/complete-order`, {
        driver: driver._id,
        imageUrl,
      });
    } catch (error) {
      console.log('error when completing order', error);
      message.body("We couldn't complete your order for some reason.");
      deliverResponse(res, twiml);
      return false;
    }

    const customerNumber = latestOrder.customer_phone;
    const driverName = driver.fullName;
    const businessName = business.businessName;
    const customerMessage = `Hi, this is ${driverName.split(' ')[0]} from Kahzum! I just dropped off your order from ${businessName}. Thanks for supporting small businesses!`;
    const deliveredTo = latestOrder.address;
    const driverMessage = `Confirmed dropoff at ${deliveredTo}`;

    // send the message to the customer
    sendMediaMsg(customerMessage, [twilioReq.MediaUrl0], customerNumber);

    // send the message to the driver
    message.body(driverMessage);
    deliverResponse(res, twiml);

    // Check if the driver is done
    if (await isDriverDone(driver)) {
      // reset the driver's state.
      resetDriverState(driver);
      sendMsg('Looks like you are all done for today!', driver.phone);
    }
    return true;
  }
  message.body('You dropped off without an image. If you forgot to send the image, please resend "Dropoff" with the image of the order.');
  deliverResponse(res, twiml);
  return false;
};

/**
 * @description Endpoint that sends all drivers for a locality their route for the day. (not link)
 * @param {@Object} req - the request object
 * @param {@Object} res - the response object that allows you to send a response
 * @returns {null}
 */
router.post('/deliver-routes', async (req, res) => {
  const drivers = await Driver.find({ locality: req.body.locality, state: 'checkin' }).populate('todaysRoute');
  if (drivers.length === 0) {
    res.status(200).send(`No drivers available in this locality: ${req.body.locality}`);
  }
  drivers.forEach(async (driver) => {
    let msg = `Hi ${driver.fullName.split(' ')[0]}! Your route today will be as follows:\n`;
    const route = await getRouteInfoFromTodaysRoute(driver.todaysRoute);
    route.forEach((routeStop, index) => {
      // we know if it is a dropoff if stop.address == order.address
      try {
        if (routeStop.address === routeStop.order.address) {
        // this is a dropoff
          msg += `\nStop ${index + 1}: Dropoff at ${routeStop.address}`;
        } else {
        // this is a pickup
          msg += `\nStop ${index + 1}: Pickup from ${routeStop.order.business.businessName} for ${routeStop.order.address}`;
        }
      } catch (err) {
        console.warn('Error in /deliver-routes endpoint while trying to list a stop', err);
      }
    });
    msg += '\n\nText "on my way" to start your route!';
    // eslint-disable-next-line no-param-reassign
    driver.state = 'ready';
    driver.save().then(() => {
      sendMsg(msg, driver.phone);
      res.status(200).send(msg);
    }).catch((err) => {
      res.sendStatus(500).send(`something went wrong when saving the driver: ${JSON.stringify(err)}`);
    });
  });
});

/**
 * @description The initial endpoint called by twilio's servers whenever a
 * text comes in to one of our numbers
 * @param {Object} req - the request
 * @param {Object} res - the response object
 * @returns {HTTPResponse}
 */
router.post('/sms', async (req, res) => {
  const { MessagingResponse } = require('twilio').twiml;
  const twiml = new MessagingResponse();
  const message = twiml.message();
  const body = req.body.Body;

  if (!body) {
    res.writeHead(400, { 'Content-Type': 'text/xml' });
    return;
  }

  const driver = await Driver.findOne({ phone: formatPhoneNumber(req.body.From) });
  console.log(driver);
  if (driver === null) {
    message.body("We couldn't find a driver with your phone number. Contact us @ www.kahzum.com");
    deliverResponse(res, twiml);
    return;
  }

  if (textCompare(body, 'checkin')) {
    handleCheckin(driver, res, message, twiml);
  } else if (textCompare(body, 'on my way')) {
    handleOnWay(driver, res, message, twiml);
  } else if (textCompare(body, 'pickup')) {
    handlePickup(driver, res, message, twiml);
  } else if (textCompare(body, 'Dropoff')) {
    handleDropoff(req.body, message, driver, twiml, res);
  } else {
    message.body('Could not understand your text. Your options are:\n1. checkin\n2. on my way\n3. pickup\n4. dropoff');
    deliverResponse(res, twiml);
  }
});

/**
 * This function sends everything that is listed in the payload (depending on how it works)
 */
router.post('/send-order-info', async (req, res) => {
  const event = req.body.event;
  // console.log('the request data', event);
  const state = event.operationType;
  let msg = '';
  if (state === 'delete') {
    msg = `One of the businesses ${state}-ed an order. It had the id: ${event.documentKey._id.$oid}`;
  } else {
    const businessId = event.fullDocument.business.$oid;
    const business = await Business.findById(businessId);
    const businessName = business ? business.businessName : "couldn't find business";
    const document = event.fullDocument;
    msg = `order ${state}-ed for ${businessName}. This is their new order: ${JSON.stringify(document)}`;
  }

  // console.log(msg);
  sendMsg(msg, '530-401-3190');
  sendMsg(msg, '650-235-5166');
  res.send('completed');
});

module.exports = router;
