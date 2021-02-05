const express = require('express');
const Request = require('../models/request');

const router = express.Router();

// @description adds a new request to the database
// @params
// businessID: String
// customerID: String
// @payload success message
router.post('/add-request', (req, res) => {
  if (!req.body.hasOwnProperty('businessID')) {
    res.status(400).send(req.body);
    return;
  }
  if (!req.body.hasOwnProperty('customerID')) {
    res.status(400).send('Missing customerID');
    return;
  }
  if (!req.body.hasOwnProperty('productID')) {
    res.status(400).send('Missing productID');
    return;
  }
  const request = new Request({
    businessID: req.body.businessID,
    customerID: req.body.customerID,
    productID: req.body.productID,
  });
  //owner.save().catch((err) => {
  //  console.log(err);
  //});
  request.save().then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err._message);
  });
});

// @description updates information about the request
// @params
// {
//   businessID: 'businessID',
//   customerID: 'customerID',
// }
// owner_email: String
// @payload
// success message
router.patch('/update-request', async (req, res) => {
  if (!req.body.hasOwnProperty('request')) {
    res.status(400).send('Missing request');
    return;
  }
  try {
    const request = await Request.findOne({ _id: req.body.request });
    if (req.body.businessID) {
      business.businessID = req.body.businessID;
    }
    if (req.body.customerID) {
      business.customerID = req.body.customerID;
    }
    request.save();
    res.send('Updated business');
  } catch (e) {
    res.status(404).send(JSON.stringify(e));
  }
});












// @description returns business info
// @params
// {
//   business: 'businessID',
// }
// @payload
// {
// businessName: String
// businessPhone: String
// businessAddress: String
// }
/*router.get('/business-info', (req, res) => {
  if (!req.query.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
    return;
  }
  Business.findOne({ _id: req.query.business }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(404).send('Could not find business');
    }
    res.send(JSON.stringify(doc));
  });
});*/

module.exports = router;
