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
router.post('/add-orders', async (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
  }
  if (!req.body.hasOwnProperty('orders')) {
    res.status(400).send('Missing orders');
  }
  const orders = [];
  for (let i = 0; i < req.body.orders.length; i += 1) {
    const order = req.body.orders[i];
    const pendingOrder = new PendingOrder({
      business: req.body.business,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      address: order.address,
    });
    try {
      // eslint-disable-next-line no-await-in-loop
      const saved = await pendingOrder.save();
      orders.push(saved);
    } catch (e) {
      console.log(e);
      res.status(400).send(`${JSON.stringify(e)}`);
      return;
    }
  }
  res.send(orders);
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
//     createdAt: "2020-10-27T04:15:43.538Z",
//     updatedAt: "2020-10-27T04:15:43.538Z",
//     __v: 0
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
