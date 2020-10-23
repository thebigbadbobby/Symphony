const express = require('express');
const PendingPickup = require('../models/pending_delivery');
const PendingDelivery = require('../models/pending_delivery');

const router = express.Router();

// @params
// business: businessID,
// deliveries: Array of addresses

router.post('/add-pickup', (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
  }
  if (!req.body.hasOwnProperty('deliveries')) {
    res.status(400).send('Missing deliveries');
  }
  const deliveries = [];
  req.body.deliveries.forEach((address) => {
    const pendingDelivery = new PendingDelivery({
      business: req.body.business,
      address,
    });
    pendingDelivery.save()
      .then((result) => {
        deliveries.push(result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(`${JSON.stringify(err)}`);
      });
  });
  const pendingOrder = new PendingOrder({
    business: req.body.business,
    deliveries,
  });
  pendingOrder.save()
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
