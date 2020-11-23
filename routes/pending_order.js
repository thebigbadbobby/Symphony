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
//     customer_phone: 'string',
//     id: string
//   }],
// }
// @payload returns a success message and the orders pre-changed
router.post('/add-orders', async (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
    return;
  }
  if (!req.body.hasOwnProperty('orders')) {
    res.status(400).send('Missing orders');
    return;
  }
  const promises = [];
  for (let i = 0; i < req.body.orders.length; i += 1) {
    const order = req.body.orders[i];
    promises.push(new Promise((resolve, reject) => {
      if (order.id) {
        PendingOrder.findByIdAndUpdate(order.id,
          {
            $set: {
              address: order.address,
              customer_phone: order.customer_phone,
              customer_name: order.customer_name,
            },
          }).then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      } else {
        const newOrder = new PendingOrder({
          business: req.body.business,
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          address: order.address,
        });
        newOrder.save().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      }
    }));
  }

  Promise.all(promises).then((result) => {
    // Note, this sends what it previously was! Don't use this value
    res.send(result);
  }).catch((err) => {
    res.status(500).send(JSON.stringify(err));
  });
});

// @description deletes an order
// @params
// {
//   orderId: string // the order id to be deleted
// }
//
//
router.delete('/delete-order', (req, res) => {
  const requestBody = req.body;
  console.log(requestBody);
  if (!requestBody.hasOwnProperty('orderId')) {
    res.status(400).send('Missing order id');
    return;
  }
  PendingOrder.findByIdAndDelete(requestBody.orderId)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(400).send('Couldn\'t find id to delete');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
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
  const requestBody = req.query;
  if (!requestBody.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
    return;
  }
  PendingOrder.find({ business: requestBody.business })
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
