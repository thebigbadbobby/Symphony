const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dotenv = require('dotenv');
const Driver = require('./models/driver');

// connect to mongodb & listen for requests

dotenv.config();
// Replace the following with your Atlas connection string

const dbURI = process.env.MONGO_URL;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = 5000;
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

// mongoose & mongo tests
app.get('/add-driver', (req, res) => {
  const driver = new Driver({
    fullName: 'John Smith',
    phone: '408-435-5532',
    email: 'smith@gmail.com',
  });

  driver.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-drivers', (req, res) => {
  Driver.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-driver', (req, res) => {
  Driver.findById('5ea99b49b8531f40c0fde689')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
