const express = require('express');
const PendingOrder = require('../models/pending_order');
const Delivery = require('../models/delivery');

const router = express.Router();

// @params
// business: businessID,
// deliveries: array of addresses
// customer_name: string
// customer_phone: string


router.post('/newOrders', (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
  }
  if (!req.body.hasOwnProperty('deliveries')) {
    res.status(400).send('Missing deliveries');
  }
  const deliveries = [];
  req.body.deliveries.forEach((address) => {
    const delivery = new Delivery({
      business: req.body.business,
      address,
    });
    Delivery.save()
      .then((result) => {
        deliveries.push(result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(`${JSON.stringify(err)}`);
      });
  });
  const order = new Order({
    business: req.body.business,
    deliveries,
  });
  Order.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

// @params
// business: businessID,
// delivery: address

router.post('/newOrder', (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
  }
  if (!req.body.hasOwnProperty('delivery')) {
    res.status(400).send('Missing delivery');
  }
  const order = new Order({
    business: req.body.business,
    delivery: req.body.delivery
  });
  Order.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

router.get('/all-pickups', (req, res) => {
  Driver.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

// {
//     pendingPickups: [id1, id2]
// }
router.get('/best-route/:pickupID', ((req, res) => {
  // req.params.deliveryID
}));

router.get('/complete-pickup/:pickupID', ((req, res) => {
  // req.params.deliveryID
}));

router.get('/:pickupID', (req, res) => {
  PendingPickup.findById(req.params.pickupID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
