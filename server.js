const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const driver = require('./routes/driver');
const twilio = require('./routes/twilio');
const pending = require('/routes/pending_delivery');

const app = express();

// connect to mongodb & listen for requests

dotenv.config();
// Replace the following with your Atlas connection string

const dbURI = process.env.MONGO_URL;
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use('/driver', driver);
app.use('/pending-delivery', pending);
app.use('/twilio', twilio);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => `Server running on port ${port}`);
  })
  .catch((err) => console.log(err));

// app.post('/api/drivers', (req, res) => {
//   res.json(customers);
// });
//
// app.get('/api/drivers', (req, res) => {
//   res.json(customers);
// });
