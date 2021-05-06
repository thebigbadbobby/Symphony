const express = require('express');
const Business = require('../models/business');
const Owner = require('../models/owner');
const PendingOrder = require('../models/pending_order');
const CompletedOrder = require('../models/completed_order');


const router = express.Router();

// @description deletes a business's order
// @params
// {
//   business: id,
//   order: id
// }
// @payload
// Return success message
router.post('/delete-order', ((req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
    return;
  } if (!req.body.hasOwnProperty('order')) {
    res.status(400).send('Missing order');
    return;
  }
  PendingOrder.deleteOne({ _id: req.body.order, business: req.body.business }, (err) => {
    if (err) {
      res.status(404).send('Could not find order');
    }
    // deleted at most one pendingOrder document
  });
  res.send('Success deleted order');
}));

// @description finds owners business
// @params
// ownerEmail: String
// @payload
// businessID: ID
// newUser: boolean
router.post('/sign-in', (req, res) => {
  if (!req.body.hasOwnProperty('ownerEmail')) {
    res.status(400).send('Missing ownerEmail');
    return;
  }
  Owner.findOne({ email: req.body.ownerEmail })
    .then((owner) => {
      Business.findOne({ owners: { $in: owner._id } })
        .then((business) => {
          if (business) {
            res.send({ businessID: business._id, newUser: false });
          } else {
            res.status(400).send(`Owner ${owner._id} does not belong to any business`);
          }
        })
        .catch((err) => {
          console.log('error: ', err);
          res.status(404).send(`Owner ${owner._id} does not belong to any business`);
        });
    })
    .catch(() => {
      res.send({ businessID: undefined, newUser: true });
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
    return;
  }
  if (!req.body.hasOwnProperty('ownerFullName')) {
    res.status(400).send('Missing OwnerName');
    return;
  }
  if (!req.body.hasOwnProperty('ownerPhone')) {
    res.status(400).send('Missing ownerPhone');
    return;
  }
  if (!req.body.hasOwnProperty('ownerEmail')) {
    res.status(400).send('Missing ownerEmail');
    return;
  }
  if (!req.body.hasOwnProperty('pickupAddress')) {
    res.status(400).send('Missing pickupAddress');
    return;
  }
  if (!req.body.hasOwnProperty('businessPhone')) {
    res.status(400).send('Missing Phone');
    return;
  }
  if (!req.body.hasOwnProperty('pickupTimes24hr')) {
    res.status(400).send('Missing pickup times');
    return;
  }
  if (!req.body.hasOwnProperty('locality')) {
    res.status(400).send('Missing locality');
    return;
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
    pickupTimes24hr: req.body.pickupTimes24hr,
    locality: req.body.locality,
    owners: [owner._id],
  });
  owner.save().catch((err) => {
    console.log(err);
  });
  business.save().then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err._message);
  });
});

// @description updates information about the business
// @params
// {
//   business: 'businessID',
//   businessPhone: 'String' (optional property),
//   pickupAddress: 'String' (optional property),
//   businessName: 'String' (optional property),
// }
// owner_email: String
// @payload
// success message
router.patch('/update-business', async (req, res) => {
  if (!req.body.hasOwnProperty('business')) {
    res.status(400).send('Missing business');
    return;
  }
  try {
    const business = await Business.findOne({ _id: req.body.business });
    if (req.body.businessPhone) {
      business.businessPhone = req.body.businessPhone;
    }
    if (req.body.pickupAddress) {
      business.pickupAddress = req.body.pickupAddress;
    }
    if (req.body.businessName) {
      business.businessName = req.body.businessName;
    }
    if (req.body.locality) {
      business.locality = req.body.locality;
    }
    business.save();
    res.send('Updated business');
  } catch (e) {
    res.status(404).send(JSON.stringify(e));
  }
});

// @description returns businesses completed orders
// @params
// {
//   business: 'businessID',
//   N: integer (number of orders to return, optional)
// }
// @payload
// Returns N orders that business completed ordered by most recent
router.get('/completed-orders', async (req, res) => {
  if (!req.query.hasOwnProperty('business')) {
    res.status(400).send('Missing businessss');
    return;
  }
  if (!req.query.hasOwnProperty('N')) {
    res.status(400).send('Missing N');
    return;
  }
  if (isNaN(req.query.N) || parseInt(req.query.N) <= 0) {
    res.status(400).send('N has to be a positive integer');
    return;
  }
  try {
    const orders = await CompletedOrder.find({ business: req.query.business })
      .sort({ createdAt: -1 }).populate('driver');
    res.send(orders.splice(0, parseInt(req.query.N)));
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
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
router.get('/business-info', (req, res) => {
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
});


// @description gets a specific owner
// @params
// ownerID: id
// @payload
// the owner
router.get('/:business', (req, res) => {
  Business.findById( req.params.business )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

module.exports = router;
