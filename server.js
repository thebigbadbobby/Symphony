const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
//const driver = require('./routes/driver');
const business = require('./routes/business');
const owner = require('./routes/owner');
const order = require('./routes/pending_order');
const customer = require('./routes/customer');
const request = require('./routes/request');
const product = require('./routes/product')
const invoice = require('./routes/invoice')
//const twilio = require('./routes/twilio');
//const routing = require('./routes/routing');

// const pendingPickup = require('./routes/pending_pickup');

const app = express();

app.use(cors());

// connect to mongodb & listen for requests

dotenv.config();
// Replace the following with your Atlas connection string

let dbURI;
if (process.env.DEV_MODE === 'FALSE') {
  dbURI = process.env.MONGO_URL_PROD;
} else {
  dbURI = process.env.MONGO_URL_DEV;
}
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/business', business);
//app.use('/driver', driver);
app.use('/owner', owner);
app.use('/order', order);
app.use('/customer', customer);
app.use('/request', request);
app.use('/product', product)
app.use('/invoice', invoice)
//app.use('/twilio', twilio);
//app.use('/routing', routing);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
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
