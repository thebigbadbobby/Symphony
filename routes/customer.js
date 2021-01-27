const express = require('express');
const Customer = require('../models/customer');
const Business = require('../models/business');

const router = express.Router();

router.post('/sign-in', (req, res) => {
  if (!req.body.hasOwnProperty('email')) {
    res.status(400).send('Missing email');
    return;
  }
  console.timeLog(req.body.email)
  Customer.findOne({ email: req.body.email })
    .then((customer) => {
          if (customer) {
            console.log("found")
            res.send({ customerID: customer._id, newUser: false });
          } else {
            res.send({ customerID: undefined, newUser: true });
          }
    })
    .catch(() => {
      res.send({ customerID: undefined, newUser: true });
    });
});
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
router.post('/add-customer', (req, res) => {
  if (!req.body.hasOwnProperty('fullName')) {
    res.status(400).send('Missing customer');
  }
  if (!req.body.hasOwnProperty('phone')) {
    res.status(400).send('Missing customer');
  }
  if (!req.body.hasOwnProperty('email')) {
    res.status(400).send('Missing customer');
  }
  const customer = new Customer({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
  });
  customer.save().then((result) => {
    res.send(result);
  })
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