const express = require('express');
const Driver = require('../models/driver');

const router = express.Router();

router.get('/add-delivery', (req, res) => {
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

router.get('/all-deliveries', (req, res) => {
  Driver.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get('/', (req, res) => {
//     Driver.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// /completed-delivery/32748236748
router.get('/complete-delivery/:deliveryID', ((req, res) => {
  // req.params.deliveryID
}));

router.get('/:deliveryID', (req, res) => {
  Driver.findById(req.params.deliveryID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
