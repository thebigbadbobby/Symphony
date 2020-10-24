const express = require('express');
const Business = require('../models/business');
const Owner = require('../models/owner');

const router = express.Router();

// @description finds owners business
// @params
// owner_email: String
// @payload
// businessID
router.get('/my-businessID', (req, res) => {
  if (!req.body.hasOwnProperty('owner_email')) {
    res.status(400).send('Missing owner_email');
  }
  Owner.find({ email: req.body.owner_email })
    .then((owner) => {
      Business.find({ owners: { $in: owner._id } })
        .then((business) => {
          res.send(business._id);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send(`Owner ${owner._id} does not belong to any business`);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(`${req.body.owner_email} not found`);
    });
});

// @description adds a new business to the database
// @params
// businessName: String
// businessPhone: String
// pickupAddress: String
// ownerFullName: String
// ownerPhone: String
// ownerEmail: String
// owners: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Owner',
//     required: true,
//   }],
// @payload success message
router.post('/add-business', (req, res) => {
  if (!req.body.hasOwnProperty('businessName')) {
    res.status(400).send('Missing businessName');
  }
  if (!req.body.hasOwnProperty('ownerFullName')) {
    res.status(400).send('Missing OwnerName');
  }
  if (!req.body.hasOwnProperty('ownerPhone')) {
    res.status(400).send('Missing ownerPhone');
  }
  if (!req.body.hasOwnProperty('ownerEmail')) {
    res.status(400).send('Missing ownerEmail');
  }
  if (!req.body.hasOwnProperty('pickupAddress')) {
    res.status(400).send('Missing pickupAddress');
  }
  if (!req.body.hasOwnProperty('businessPhone')) {
    res.status(400).send('Missing Phone');
  }
  const owner = new Owner({
    fullName: req.body.ownerFullName,
    phone: req.body.ownerPhone,
    email: req.body.ownerEmail,
  });
  const business = new Business({
    businessName: req.body.businessName,
    pickupAddress: req.body.pickupAddress,
    businessPhone: req.body.businessPhone,
    owners: [owner._id],
  });
  owner.save().catch((err) => {
    console.log(err);
  });
  business.save().then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
