const express = require('express');
const Owner = require('../models/owner');
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
    res.status(400).send('Missing owner');
  }
  const owner = new Owner({
    fullName: req.body.owner.fullName,
    phone: req.body.owner.phone,
    email: req.body.owner.email,
  });
  owner.save()
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
  Business.findOne({ _id: req.body.business }, (err, business) => {
    if (err) {
      res.status(404).send(`can't find business ${req.body.business}`);
    }
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
