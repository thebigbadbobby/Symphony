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
