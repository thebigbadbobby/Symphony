const express = require('express');
const Customer = require('../models/customer');
const Product = require('../models/product');

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
router.post('/add-product', (req, res) => {
  console.log(req.body)
  if (!req.body.hasOwnProperty('itemName')) {
    res.status(400).send('Missing name of item');
  }
  // if (!req.body.hasOwnProperty('requestAvail')) {
  //   res.status(400).send('Missing requestAvailibility');
  // }
  // if (!req.body.hasOwnProperty('reqCheckoutDuration')) {
  //   res.status(400).send('Missing product');
  // }
  const product = new Product({
    itemName: req.body.itemName,
    businessID: req.body.businessID,
    requestAvail: req.body.requestAvail,
    reqCheckoutDuration: req.body.reqCheckoutDuration,
    returnOpt: req.body.returnOpt,
    price: req.body.price,
    itemDescription: req.body.itemDescription,
  });
  product.save()
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
router.get('/all-products', (req, res) => {
  Product.find()
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
router.get('/:productID', (req, res) => {
  Product.findById(req.params.productID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

module.exports = router;