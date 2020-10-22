const express = require('express');
const Owner = require('../models/driver');

const router = express.Router();

router.get('/add-owner', (req, res) => {
  // const driver = new Driver({
  //   fullName: 'John Smith',
  //   phone: '408-435-5532',
  //   email: 'smith@gmail.com',
  // });

  Owner.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/all-deliveries', (req, res) => {
  Owner.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get('/', (req, res) => {
//     Driver.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

router.get('/:ownerID', (req, res) => {
  Owner.findById(req.params.ownerID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
