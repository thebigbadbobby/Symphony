const express = require('express');
const Customer = require('../models/customer');
const Invoice = require('../models/invoice');
const axios = require('../node_modules/axios');
const router = express.Router();
const REWARD_FACTOR=.1
async function newCustomer(){
  var api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
  axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/customers',
      data: {
      },
      headers: {
          Authorization: 'Bearer ' + api_key
      }
  })
  .then((response) => {
      console.log(response);
  }, (error) => {
      console.log(error);
  });
}
async function setupIntent(customerID){
  var api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
  await axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/setup_intents',
      // data: {

      // },
      customer: customerID,
      usage: "off_session",
      headers: {
          Authorization: 'Bearer ' + api_key
      }
  })
  .then((response) => {
      client_secret=response.data.client_secret
  })
  .catch(error => {
    console.log("koffing" +error);
  });
}
async function paymentIntents(customerID, amount, paymentMethod){
  var api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
  axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/payment_intents?customer='+customerID+'&amount='+amount+'&currency=usd&off_session=true&confirm=true&payment_method='+paymentMethod,
      // data: {

      // },
      customer: customerID,
      amount: 1099,
      currency: 'usd',
      payment_method: "pm_card_visa",
      off_session: 'true',
      confirm: 'true',

      headers: {
          Authorization: 'Bearer ' + api_key,

      }
  })
  .then((response) => {
      console.log(response.data)

  }, (error) => {
      console.log(error);
  });
}
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
  var api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
  axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/customers',
      data: {
      },
      headers: {
          Authorization: 'Bearer ' + api_key
      }
  })
  .then((response) => {
      console.log(response);
      const customer = new Customer({
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        bread: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        stripeCustomerID: response.data.id
      });
      customer.save().then((result) => {
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
router.get('/:customer', (req, res) => {
  Customer.findById( req.params.customer )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${JSON.stringify(err)}`);
    });
});

router.patch('/get-ClientSecret', (req, res) => {
  console.log("ekans")
  console.log(req.body.customer)
  if (!req.body.hasOwnProperty('customer')) {
    console.log("didnt find customer attribute")
    res.status(400).send('customer');
    return
  }
  try{
    const customer = Customer.findOne({ _id: req.body.customer });
    console.log("found customer")
    var api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
  axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/setup_intents',
      // data: {

      // },
      customer: customer.stripeCustomerID,
      usage: "off_session",
      headers: {
          Authorization: 'Bearer ' + api_key
      }
  })
  .then((response) => {
    res.send(response.data.client_secret);
  })
  .catch((error) => {
    res.status(500).send(error);
    console.log("koffing" +error);
  });
  }
  catch{
    res.status(405).send('Misconfigured Attributes');
  }
});

router.patch('/payInvoice', (req, res) => {
  console.log("ekans")
  console.log(req.body.customer)
  if (!req.body.hasOwnProperty('customer')) {
    console.log("didnt find customer")
    res.status(400).send('customer');
    return
  }
  if (!req.body.hasOwnProperty('invoice')) {
    console.log("didnt find invoice")
    res.status(400).send('invoice');
    return
  }
  try{
    console.log("found customer")
    console.log("ekans", req.body.customer.stripeCustomerID, req.body.customer.stripePaymentMethod, req.body.invoice.total)
    var api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
    console.log("starting")
    api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
    axios({
        method: 'post',
        url: 'https://api.stripe.com/v1/payment_intents?customer='+req.body.customer.stripeCustomerID+'&amount='+req.body.invoice.total*100+'&currency=usd&off_session=true&confirm=true&payment_method='+req.body.customer.stripePaymentMethod,
        // data: {

        // },
        customer: req.body.customer.stripeCustomerID,
        amount: req.body.invoice.total*100,
        currency: 'usd',
        payment_method: req.body.customer.stripePaymentMethod,
        off_session: 'true',
        confirm: 'true',
        
        headers: {
            Authorization: 'Bearer ' + api_key,
            
        }
    })
    .then((response) => {
        console.log(response.data)
        rewardCustomer(req.body.customer._id, req.body.invoice.total)
        res.status(200).send(response.data)
    }, (error) => {
        res.status(500).send("payment failed", error)
    });
  } 
  catch (err){
    console.log("epic fail", err)
    res.status(405).send('Misconfigured Attributes');
  }
});


router.patch("/send", async (req,res) => {
  if (!req.body.hasOwnProperty('customer')) {
    console.log("ERROR");
    res.status(400).send('Missing customer');
    return;
  }
  if (!req.body.hasOwnProperty('amount')) {
    console.log("ERROR");
    res.status(400).send('Missing amount');
    return;
  }
  if (!req.body.hasOwnProperty('assetnum')) {
    console.log("ERROR");
    res.status(400).send('Missing asset number');
    return;
  }
  if (!req.body.hasOwnProperty('recipient')) {
    console.log("ERROR");
    res.status(400).send('Missing recipient email');
    return;
  }
  try {
    console.log("a", req.body.amount)
    const customer = await Customer.findOne({ _id: req.body.customer });
    console.log("b", req.body.customer)
    customer.bread[req.body.assetnum]=Number(customer.bread[req.body.assetnum]-req.body.amount)
    console.log("c", customer.bread[req.body.assetnum])
    customer.markModified("bread");
    customer.save();
    const recipient = await Customer.findOne({ email: req.body.recipient });
    recipient.bread[req.body.assetnum]=recipient.bread[req.body.assetnum] + Number(req.body.amount)
    console.log("d", typeof(recipient.bread[req.body.assetnum]) + typeof(req.body.amount))
    recipient.markModified("bread");
    recipient.save();
    console.log("e", recipient.bread)
    res.send(customer);
  } catch (e) {
    res.status(404).send(JSON.stringify(e));
  }
});
router.patch('/update-customer', async (req, res) => {
  if (!req.body.hasOwnProperty('customer')) {
    console.log("ERROR");
    res.status(400).send('Missing customer');
    return;
  }
  try {
    const customer = await Customer.findOne({ _id: req.body.customer });
    console.log("found customer")
    if (req.body.stripePaymentMethod) {
      api_key= 'sk_test_51Hn9OnA14Vf667k5EJycEMKulmOenypbewTxkxucsLTIzK8ZcLp6wrezr2Aw14CP6LxR018OOAnKVXsJ6zNSKghR00bGLT1HK1'
      axios({
          method: 'post',
          url: 'https://api.stripe.com/v1/payment_methods/'+req.body.stripePaymentMethod+'/attach?customer='+customer.stripeCustomerID,
          // data: {

          // },
          //customer: customerID,
          
          headers: {
              Authorization: 'Bearer ' + api_key,
              
          }
      })
      .then((response) => {
          console.log(response.data)
      }, (error) => {
          console.log(error);
      });
      customer.stripePaymentMethod = req.body.stripePaymentMethod;
    }
    if (req.body.email) {
      customer.email = req.body.email;
    }
    if (req.body.phone) {
      customer.phone = req.body.phone;
    }
    customer.save();
    res.send('Updated customer');
  } catch (e) {
    res.status(404).send(JSON.stringify(e));
  }
});
const rewardCustomer = async (customerID, amount) => {
  console.log(customerID)
  const customer = await Customer.findOne({ _id: customerID });
  customer.bread[0]+=amount*REWARD_FACTOR
  customer.markModified("bread");
  customer.save()
  console.log(customer.bread)
}

module.exports = router;