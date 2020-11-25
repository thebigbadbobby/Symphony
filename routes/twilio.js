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

dotenv.config();
const port = process.env.SERVER_PORT || 5000;

const router = express.Router();

/**
 * @description Handles marking the order as completed and texting the customer
 * @param {Object} twilioReq
 * @returns {boolean}
 */
const handleDropoff = async (twilioReq, message) => {
  // "Body" is the text, "MediaUrl0" is the image
  const driverPhone = formatPhoneNumber(twilioReq.From);
  const driver = await Driver.findOne({ phone: driverPhone });
  if (driver.ordersDelivering.length === 0) {
    message.body("Looks like you don't have any orders left to dropoff. Let us know if this is an error!");
    return false;
  }
  const latestOrder = await PendingOrder.findById(driver.ordersDelivering[0]);
  const business = await Business.findById(latestOrder.business);
  const imageUrl = twilioReq.MediaUrl0;
  if (!driver) {
    message.body("We couldn't find a driver with your phone number. Contact us @ www.kahzum.com");
    return false;
  }
  if (!business) {
    message.body("We couldn't find the business corresponding to that order.");
    return false;
  }
  try {
    await axios.post(`http://localhost:${port}/driver/complete-order`, {
      driver: driver._id,
      order: latestOrder._id,
      imageUrl,
    });
  } catch (error) {
    message.body("We couldn't complete your order for some reason.");
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
  return true;
};

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

  if (textCompare(body, 'Dropoff')) {
    // if we have an image
    if (req.body.NumMedia !== '0' && req.body.MediaUrl0) {
      const sent = await handleDropoff(req.body, message);

      // if the handle dropoff failed, it will return false.
      if (!sent) {
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
        return;
      }
    } else {
      message.body('You dropped off without an image. If you forgot to send the image, please resend "Dropoff" with the image of the order.');
    }
  }

  // if (req.body.Body === 'hello') {
  //   message.body('Hi!');
  // } else if (req.body.Body === 'bye') {
  //   message.body('Goodbye');
  // } else if (req.body.Body === 'robot') {
  //   twiml.message('Here\'s a robot');
  //   message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  // } else {
  //   message.body('No Body param match.');
  // }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
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
