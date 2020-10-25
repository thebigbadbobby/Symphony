const express = require('express');
const Owner = require('../models/driver');
const Business = require('../models/business');

const router = express.Router();

// @description returns the pending orders for a specific business
// @params
// {
//   business: 'businessID',
//   owner: {
//     addresses: 'string',
//     customer_name: 'string',
//     customer_phone: 'string'
//   }
// }
// @payload
// success message
router.post('/add-owner', (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
  }
  if (!req.body.hasOwnProperty('owner')) {
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
      res.status(500).send(`${JSON.stringify(err)}`);
    });
  const business = Business.find({ _id: req.body.business });
  business.owners.push(owner._id);
  business.save()
    .then((result) => {
      res.send(`added owner to business ${result._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
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
