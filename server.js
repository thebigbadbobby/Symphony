const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const driver = require('./routes/driver');
const business = require('./routes/business');
const twilio = require('./routes/twilio');
// const pendingPickup = require('./routes/pending_pickup');

const app = express();

// connect to mongodb & listen for requests

dotenv.config();
// Replace the following with your Atlas connection string

const dbURI = process.env.MONGO_URL;
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use('/driver', driver);
app.use('/business', business);
// app.use('/pickup', pendingPickup);
app.use('/twilio', twilio);

app.post('/api/deliveries', (req, res) => {
  let deliveries = [];
  const owner = Owner.find({ email: req.params.email }, (err) => {
    if (err) {
      res.status(404).send('Could not find owner from email');
    }
  });
  const business = Business.find({ _id: owner._id });
  const orders = PendingPickup.find({ business: business._id });
  orders.forEach((order) => {
    order.populate('deliveries')
      .exec((err, myOrder) => {
        if (err) {
          res.status(500).send(`${JSON.stringify(err)}`);
        }
        deliveries = deliveries.concat(myOrder.deliveries);
      });
  });
  res.send(JSON.stringify(deliveries));
});
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // app.listen(port, () => `Server running on port ${port}`);
  })
  .catch((err) => console.log(err));
app.listen(port, () => `Server running on port ${port}`);
// app.post('/api/drivers', (req, res) => {
//   res.json(customers);
// });
//
// app.get('/api/drivers', (req, res) => {
//   res.json(customers);
// });
