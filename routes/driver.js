const express = require('express');
const Driver = require('../models/driver');
const PendingOrder = require('../models/pending_order');
const CompletedOrder = require('../models/completed_order');

const router = express.Router();

// @description when driver completes order
// move a pending order to complete order collection
// @params
// {
//   driver: id,
//   order: id,
//   imageUrl: string
// }
// @payload
// array of completed order objects
router.post('/complete-order', async (req, res) => {
  if (!req.body.driver) {
    res.status(400).send('Missing driver');
  }
  if (!req.body.hasOwnProperty('order')) {
    res.status(400).send('Missing order');
  }
  if (!req.body.hasOwnProperty('imageUrl')) {
    res.status(400).send('Missing image');
  }
  // code is a mess because query and methods are asynchronous
  Driver.findById(req.body.driver, (err, driver) => {
    if (err) {
      res.status(404).send('Could not find driver');
    }
    const index = driver.ordersDelivering.indexOf(req.body.order);
    if (index > -1) {
      const pendingOrderID = driver.ordersDelivering[index];
      PendingOrder.findById(pendingOrderID, (errP, pendingOrder) => {
        if (errP) {
          res.status(404).send('Could not find order inside of pending order');
        }
        const completedOrder = new CompletedOrder(
          {
            business: pendingOrder.business,
            driver: req.body.driver,
            customer_name: pendingOrder.customer_name,
            customer_phone: pendingOrder.customer_phone,
            address: pendingOrder.address,
            imageUrl: req.body.imageUrl,
          },
        );
        driver.ordersDelivering.splice(index, 1);
        driver.save()
          .then(() => {
            completedOrder.save()
              .then(() => {
                res.send('success completed order');
              })
              .catch((errSave) => {
                console.log(err);
                res.status(500).send(`${JSON.stringify(errSave)}`);
              });
          })
          .catch((errSave) => {
            console.log(err);
            res.status(500).send(`${JSON.stringify(errSave)}`);
          });
      });
    } else {
      res.status(404).send('Could not find order');
    }
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
  const driver = new Driver({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
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
