const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const driver = require('./routes/driver');

const app = express();

// connect to mongodb & listen for requests

dotenv.config();
// Replace the following with your Atlas connection string

const dbURI = process.env.MONGO_URL;
const port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use('/driver', driver);


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
