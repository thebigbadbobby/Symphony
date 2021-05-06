const express = require('express');
const Invoice = require('../models/invoice');
const router = express.Router();
const Customer = require('../models/customer');
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

router.post('/add-invoice', (req, res) => {
  if (!req.body.hasOwnProperty('email')) {
    res.status(400).send('Missing email');
  }
      const invoice = new Invoice({
        email: req.body.email,
        total: 0,
        items: "{}",
        fulfilled: false
      });
      invoice.save().then((result) => {
        res.status(200).send(result);
      })
        .catch((err) => {
          console.log(err);
          res.status(500).send(`${JSON.stringify(err)}`);
        });
  }, (error) => {
    res.status(500).send(`${JSON.stringify(error)}`);
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

// @description gets all the owners (this is unsafe and should be removed)
// @payload
// array of owners

// @description gets a specific owner
// @params
// ownerID: id
// @payload
// the owner
router.get('/:invoice', (req, res) => {
  Invoice.findById( req.params.invoice )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

router.patch('/update-invoice', async (req, res) => {
    if (!req.body.hasOwnProperty('invoice')) {
      console.log("ERROR");
      res.status(400).send('Missing invoice');
      return;
    }
    try {
      const invoice = await Invoice.findOne({ _id: req.body.invoice });
      console.log("found customer")
      if (req.body.fulfilled) {
        invoice.fulfilled = req.body.fulfilled;
      }
      invoice.save();
      res.send('Updated invoice');
    } catch (e) {
      res.status(404).send(JSON.stringify(e));
    }
  });


router.patch("/add-items", async (req,res) => {
  if (!req.body.hasOwnProperty('invoiceID')) {
    console.log("ERROR");
    res.status(400).send('Missing invoiceID');
    return;
  }
  if (!req.body.hasOwnProperty('items')) {
    console.log("ERROR");
    res.status(400).send('Missing item');
    return;
  }
  try {
    console.log("a", req.body.items)
    const invoice = await Invoice.findOne({ _id: req.body.invoiceID });
    if (invoice.fulfilled)
    {
        res.status(401).send("Invoice has already been fulfilled.")
    }
    itemsjson=JSON.parse(invoice.items)
    for(let i in req.body.items)
    {
        if (itemsjson[i])
        {
            itemsjson[i][1]+=req.body.items[i][1]
        }
        else
        {
            itemsjson[i]=req.body.items[i]
        }
        console.log("b", req.body.items[i][0], req.body.items[i][1])
        invoice.total+=req.body.items[i][0]*req.body.items[i][1]
        console.log("c", invoice.total)
    }
    invoice.items=JSON.stringify(itemsjson)
    invoice.save();
    res.status(200).send(invoice);
  } catch (e) {
    res.status(404).send(JSON.stringify(e));
  }
});

module.exports = router;