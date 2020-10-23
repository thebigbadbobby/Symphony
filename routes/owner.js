const express = require('express');
const Owner = require('../models/driver');

const router = express.Router();

router.post('/add-owner', (req, res) => {
  if (!req.body.hasOwnProperty('fullName')) {
    res.status(400).send('Missing fullName');
  }
  if (!req.body.hasOwnProperty('phone')) {
    res.status(400).send('Missing phone');
  }
  if (!req.body.hasOwnProperty('email')) {
    res.status(400).send('Missing email');
  }
  const owner = new Owner({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
  });
  owner.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/all-owners', (req, res) => {
  Owner.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

router.get('/:ownerID', (req, res) => {
  Owner.findById(req.params.ownerID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

module.exports = router;
