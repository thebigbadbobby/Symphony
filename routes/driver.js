const express = require('express');
const axios = require('axios');
const Driver = require('../models/driver');
const PendingOrder = require('../models/pending_order');
const CompletedOrder = require('../models/completed_order');

const router = express.Router();

// @description when driver completes order
// move a pending order to complete order collection
// @params
// {
//   driver: id,
//   imageUrl: string
// }
// @payload
// array of completed order objects
router.post('/complete-order', async (req, res) => {
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
    res.status(400).send('The driver is done for the day!');
    return;
  }

  let completedOrder;
  let orderIdToBeCompleted;
  try {
    orderIdToBeCompleted = driver.todaysRoute.route[
      driver.todaysRoute.currentIndex === 0 ? 1 : driver.todaysRoute.currentIndex
    ].get('orderId');
    const orderToBeCompleted = await PendingOrder.findById(orderIdToBeCompleted);
    completedOrder = new CompletedOrder(
      {
        driver: driver._id,
        imageUrl: body.imageUrl,
        business: orderToBeCompleted.business,
        customer_name: orderToBeCompleted.customer_name,
        customer_phone: orderToBeCompleted.customer_phone,
        address: orderToBeCompleted.address,
      },
    );
  } catch (err) {
    console.log('Something went wrong with the orderId', err);
    res.status(400).send('Something went wrong when trying to make a completed order.');
    return;
  }

  // Save completed order
  completedOrder.save().then((orderSaved) => {
    // Delete the completed order from pending orders
    PendingOrder.findByIdAndDelete(orderIdToBeCompleted).then(() => {
      // Update the driver's progress along their route.
      axios.post(`http://localhost:${port}/routing/update-progress`, {
        id: driver._id,
      }).then(() => {
        // Everything has successfully updated
        res.status(200).send(orderSaved);
      }).catch((err) => {
        console.log("Couldn't update progress", err);
        // couldn't update driver progress
        res.status(400).send('Driver\'s progress was not updated!!');
      });
    }).catch((err) => {
      // couldn't delete
      console.log("Couldn't delete pending order", err);
      res.status(400).send('Couldn\'t delete the pending order');
    });
  }).catch((err) => {
    // couldn't save
    console.log("Couldn't save completed order", err);
    res.status(400).send('Couldn\'t archive the order');
  });
});

// let driver;
// console.log('hi 1')
// try {
//   driver = await Driver.findById(req.body.driver);
// } catch (e) {
//   res.status(404).send('Could not find driver');
// }
// console.log('hi 2')
// const index = driver.ordersDelivering.indexOf(req.body.order);
// console.log('hi 3')
// if (index > -1) {
//   console.log('hi 4')
//   const pendingOrderID = driver.ordersDelivering[index];
//   let pendingOrder;
//   try {
//     pendingOrder = await PendingOrder.findById(pendingOrderID);
//   } catch (e) {
//     res.status(404).send('Could not find order inside of pending order');
//   }
//   pendingOrder.driver = req.body.driver;
//   delete pendingOrder._id;
//   console.log(JSON.stringify(pendingOrder));
//   const completedOrder = new CompletedOrder();
//   console.log('dsjkfkf');
//   await completedOrder.save();
//   await PendingOrder.findByIdAndDelete(pendingOrderID);
//   // remove pending order from drivers ordersDelivering
//   driver.ordersDelivering.splice(index, 1);
//   await driver.save();
//   res.send('Success completed delivery');
// } else {
//   res.status(404).send('Could not find order inside of driver');
// }

// @description Add the order to the driver array
// @params
// {
//   driver: id,
//   order: id
// }
// @payload
// array of completed order objects
router.post('/assign-order', (req, res) => {
  if (!req.body.hasOwnProperty('driver')) {
    res.status(400).send('Missing driver');
  }
  if (!req.body.hasOwnProperty('order')) {
    res.status(400).send('Missing order');
  }
  PendingOrder.findById(req.body.order, (err, order) => {
    if (err) {
      res.status(404).send('Could not find order');
    }
    Driver.findById(req.body.driver, (errD, driver) => {
      if (errD) {
        res.status(404).send('Could not find driver');
      }
      driver.ordersDelivering.push(order);
      driver.save()
        .then((result) => {
          res.send(result);
        })
        .catch((errSave) => {
          console.log(err);
          res.status(500).send(`${JSON.stringify(errSave)}`);
        });
    });
  });
});

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
  const driver = new Driver({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    startLocation: req.body.startLocation,
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
