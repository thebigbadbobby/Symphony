const express = require('express');
const Business = require('../models/business');
const Owner = require('../models/owner');

const router = express.Router();

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
