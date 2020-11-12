const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const driver = require('./routes/driver');
const business = require('./routes/business');
const owner = require('./routes/owner');
const order = require('./routes/pending_order');
const twilio = require('./routes/twilio');
// const pendingPickup = require('./routes/pending_pickup');

const app = express();

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://my.kahzum.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(cors({
  origin: ['https://my.kahzum.com', 'http://localhost:3000'],
}));

// connect to mongodb & listen for requests

dotenv.config();
// Replace the following with your Atlas connection string

const dbURI = process.env.MONGO_URL;
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/business', business);
app.use('/driver', driver);
app.use('/owner', owner);
app.use('/order', order);
app.use('/twilio', twilio);

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
