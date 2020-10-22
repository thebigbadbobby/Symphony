const express = require('express');
const Driver = require('../models/driver');

const router = express.Router();

// router
//   .route('/cars/:carid')
//   .get((req, res) => {
//     res.send(`hi get /things/cars/${req.params.carid}`);
//   })
//   .put((req, res) => {
//     res.send(`hi put /things/cars/${req.params.carid}`);
//   });
router.get('/add-driver', (req, res) => {
  const driver = new Driver({
    fullName: 'John Smith',
    phone: '408-435-5532',
    email: 'smith@gmail.com',
  });

  driver.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/all-drivers', (req, res) => {
  Driver.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:driverID', (req, res) => {
  Driver.findById(req.params.driverID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
