const express = require('express');
const axios = require('axios');
const Driver = require('../models/driver');
const PendingOrder = require('../models/pending_order');
const CompletedOrder = require('../models/completed_order');
const { getOrdersFromOrderIds } = require('../twilio/helpers');

const router = express.Router();
const port = process.env.SERVER_PORT || 5000;

// @description when driver completes order
// move a pending order to complete order collection
// @params
// {
//   driver: id,
//   imageUrl: string
// }
// @payload
// array of completed order objects
router.post('/complete-orders', async (req, res) => {
  if (!req.body.driver) {
    res.status(400).send('Missing driver');
  }
  if (!req.body.imageUrl) {
    res.status(400).send('Missing image');
  }
  const { body } = req;

  const driver = await Driver.findById(body.driver).populate('todaysRoute');

  if (driver.state !== 'onWay') {
    res.status(400).send('Driver\'s can only complete orders when they are on the way');
    return;
  }

  if (driver.todaysRoute.route.length === driver.todaysRoute.currentIndex + 1) {
    res.status(400).send('You\'re already done for the day!');
    return;
  }

  let orderIdsToBeCompleted;
  const completedOrders = [];
  try {
    orderIdsToBeCompleted = driver.todaysRoute.route[driver.todaysRoute.currentIndex + 1].get('orderId');
    const ordersToBeCompleted = await getOrdersFromOrderIds(orderIdsToBeCompleted);
    ordersToBeCompleted.forEach((orderToBeCompleted) => {
      completedOrders.push(new CompletedOrder(
        {
          driver: driver._id,
          imageUrl: body.imageUrl,
          business: orderToBeCompleted.business,
          customer_name: orderToBeCompleted.customer_name,
          customer_phone: orderToBeCompleted.customer_phone,
          address: orderToBeCompleted.address,
        },
      ));
    });
  } catch (err) {
    console.log('Something went wrong when trying to get orders and create completed orders', err);
    res.status(400).send('Something went wrong when trying to make a completed order.');
    return;
  }

  // we want to handle the case where we have multiple orders to the same house
  const promises = completedOrders.map(async (order, idx) => {
    const orderSaved = await order.save();
    console.log('order saved', orderSaved);
    // Delete the completed order from pending orders
    const deletedSuccess = await PendingOrder.findByIdAndDelete(orderIdsToBeCompleted[idx]);
    // Update the driver's progress.
    const updatedProgress = await axios.post(`http://localhost:${port}/routing/update-progress`, {
      id: driver._id,
    });
    if (!orderSaved || !deletedSuccess || !updatedProgress) {
      throw new Error("order didn't save, didn't this.delete, or didn't update the progress!");
    }
    return orderSaved;
  });

  Promise.all(promises).then((orderSaved) => {
    res.status(200).send(orderSaved);
  }).catch((err) => {
    console.log('Failed trying to save or delete the order, or trying to progress', err);
    res.status(400).send('Failed trying to save or delete the order, or trying to progress', err);
  });
});

// @description Adds a driver to the db
// @params
// {
//   fullName: string,
//   phone: string,
//   email: string,
//   startLocation: string,
// }
// @payload
// the new driver
router.post('/add-driver', (req, res) => {
  if (!req.body.hasOwnProperty('fullName')) {
    res.status(400).send('Missing fullName');
  }
  if (!req.body.hasOwnProperty('phone')) {
    res.status(400).send('Missing phone');
  }
  if (!req.body.hasOwnProperty('email')) {
    res.status(400).send('Missing email');
  }
  if (!req.body.hasOwnProperty('startLocation')) {
    res.status(400).send('Missing startLocation');
  }
  if (!req.body.hasOwnProperty('locality')) {
    res.status(400).send('Missing locality');
  }
  const driver = new Driver({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    startLocation: req.body.startLocation,
    locality: req.body.locality,
  });
  driver.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

// @description shows all drivers
// @payload
// array drivers
router.get('/all-drivers', (req, res) => {
  Driver.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

// @description gets a specific driver
// @payload
// the driver
router.get('/:driverID', (req, res) => {
  Driver.findById(req.params.driverID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

module.exports = router;
