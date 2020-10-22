const express = require('express');
const PendingPickup = require('../models/pending_delivery');

const router = express.Router();

router.get('/add-pickup', (req, res) => {
  const pendingPickup = PendingPickup({});
  // const driver = new Driver({
  //   fullName: 'John Smith',
  //   phone: '408-435-5532',
  //   email: 'smith@gmail.com',
  // });

  // get google maps link
  res.send(req.body);
  driver.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/all-pickups', (req, res) => {
  Driver.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
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
