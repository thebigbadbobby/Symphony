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
app.use(cors());

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
module.exports = app;
