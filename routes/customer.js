const express = require('express');
const Customer = require('../models/customer');
const Business = require('../models/business');

const router = express.Router();

// @description returns the pending orders for a specific business
// @params
// {
//   business: 'businessID',
//   customer: {
//     addresses: 'string',
//     customer_name: 'string',
//     customer_phone: 'string'
//   }
// }
// @payload
// success message

//@adds customer to database
//@params
//fullName: string
//phone: string
//email: string
router.post('/add-customer', (req, res) => {
  // if (!req.body.hasOwnProperty('customer')) {
  //   res.status(400).send('Missing customer');
  // }
  //check that all properties are filled in
  if (!req.body.hasOwnProperty('fullName')) {
    res.status(400).send('Missing customer name');
  }
  if (!req.body.hasOwnProperty('phone')) {
    res.status(400).send('Missing customer phone number');
  }
  if (!req.body.hasOwnProperty('email')) {
    res.status(400).send('Missing customer email');
  }
  const customer = new Customer({
    fullName: req.body.customer.fullName,
    phone: req.body.customer.phone,
    email: req.body.customer.email,
  });
  customer.save()
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
//   Business.findOne({ _id: req.body.business }, (err, business) => {
//     if (err) {
//       res.status(404).send(`can't find business ${req.body.business}`);
//     }
//     business.owners.push(owner._id);
//     business.save()
//       .then((result) => {
//         res.send(`added owner to business ${result._id}`);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).send(`${JSON.stringify(err)}`);
//       });
//   });
});

// @description gets all the owners (this is unsafe and should be removed)
// @payload
// array of owners
router.get('/all-customers', (req, res) => {
  Customer.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

// @description gets a specific owner
// @params
// ownerID: id
// @payload
// the owner
router.get('/:customerID', (req, res) => {
  Customer.findById(req.params.customerID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

module.exports = router;