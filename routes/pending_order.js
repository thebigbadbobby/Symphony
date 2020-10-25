const express = require('express');
const PendingOrder = require('../models/pending_order');

const router = express.Router();

// @description Adds new orders to database
// @params
// {
//   business: 'businessID',
//   orders: [{
//     addresses: 'string',
//     customer_name: 'string',
//     customer_phone: 'string'
//   }],
// }
// @payload returns a success message
router.post('/new-orders', (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
  }
  if (!req.body.hasOwnProperty('orders')) {
    res.status(400).send('Missing orders');
  }
  const pendingOrders = [];
  req.body.orders.forEach((order) => {
    const pendingOrder = new PendingOrder({
      business: req.body.business,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      address: order.address,
    });
    pendingOrder.save()
      .then((result) => {
        pendingOrders.push(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(`${JSON.stringify(err)}`);
      });
  });
  // TODO change to success message
  res.send(`${JSON.stringify(pendingOrders)}`);
});

// @description returns the pending orders for a specific business
// @params
// {
//   business: 'businessID',
// }
// @payload
// [{
//     _id: 'orderID'
//     business: 'businessID'
//     addresses: 'string',
//     customer_name: 'string',
//     customer_phone: 'string'
// }],
router.get('/my-orders', (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
  }
  PendingOrder.find({ business: req.body.business })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

// // {
// //     pendingPickups: [id1, id2]
// // }
// router.get('/best-route/:pickupID', ((req, res) => {
//   // req.params.deliveryID
// }));
//
// router.get('/complete-pickup/:pickupID', ((req, res) => {
//   // req.params.deliveryID
// }));
//
// router.get('/:pickupID', (req, res) => {
//   PendingPickup.findById(req.params.pickupID)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
