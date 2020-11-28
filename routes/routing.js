const express = require('express');
const twilio = require('twilio');
const mongoose = require('mongoose');
const PersonalRoute = require('../models/personal_route');
const Driver = require('../models/driver');
const PendingOrder = require('../models/pending_order');
const Business = require('../models/business');

const router = express.Router();

let OPEN_ROUTE_API_KEY;
if (process.env.DEV_MODE === 'FALSE') {
  OPEN_ROUTE_API_KEY = process.env.OPEN_ROUTE_API_KEY_PROD;
} else {
  // console.log(process.env.OPEN_ROUTE_API_KEY_DEV);
  OPEN_ROUTE_API_KEY = process.env.OPEN_ROUTE_API_KEY_DEV;
}

// @description get route for one specific driver
// @params
// driverId
// @payload
// The routing info for that driver, detail TBD
router.get('/routeUrl', (req, res) => {
  let routeId;
  let route = [];
  const addresses = [];
  const links = [];
  const prefix = 'https://www.google.com/maps/dir/my+location/';
  const { ObjectId } = require('mongodb');
  Driver.findOne({ _id: req.body.driverId }, (err, driver) => {
    if (err) {
      res.status(404).send('can\'t find driver');
    }
    routeId = `${driver.todaysRoute}`;
  }).then(() => {
    PersonalRoute.findOne({ _id: routeId }, (err, personalRoute) => {
      if (err) {
        res.status(404).send('can\'t find route');
      }
      route = personalRoute.route.slice(1);
    }).then(() => {
      route.forEach((routeObj) => {
        addresses.push(encodeURIComponent(routeObj.get('address')));
      });
      let stopNum = 0;
      let link = 'https://www.google.com/maps/dir/my+location';
      for (let i = 0; i < addresses.length; i++) {
        if (stopNum == 10) {
          links.push(link);
          stopNum = 0;
          i -= 1;
          link = 'https://www.google.com/maps/dir/my+location';
        } else {
          link += `/${addresses[i]}`;
          stopNum += 1;
        }
      }
      links.push(link);
      res.status(200).send(JSON.stringify(links));
    });
  });
});

function getAllOrder() {
  const orderInfo = [];
  PendingOrder.find().then((docs) => {
    // console.log(docs);
    for (let i = 0; i < docs.length; i += 1) {
      const info = {};
      info['drop-off-location'] = docs[i].address;
      info.orderId = docs[i]._id;
      Business.findById(docs[i].business).then((doc) => {
        if(doc == undefined){
          console.log('unable to find business with id', docs[i].business);
          console.log('skipping order', docs[i]._id);
        } else {
          info['pick-up-location'] = doc.pickupAddress;
          orderInfo.push(info);
        }
      });
    }
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orderInfo);
    }, 2000);
  });
}

// @description Invoke python script to compute route for drivers.
// This function does not get nor save the result of rouing,
// the python script will invoke another api call to do that. See /saveRoutingOutput
router.post('/computeRoute', (req, res) => {
  // fetch info from db.

  let driverDocs;
  const dict = {};
  // fetch all(one, for now) driver id
  Driver.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      return;
    }
    driverDocs = docs;
  }).then(async () => {
    dict.driverInfo = [];
    for (let i = 0; i < driverDocs.length; i += 1) {
      const info = {};
      info.driverId = driverDocs[i]._id;
      info.startLocation = driverDocs[i].startLocation;
      dict.driverInfo.push(info);
    }

    // fetch all pending orders
    dict.orderInfo = await getAllOrder();

    const dictstring = JSON.stringify(dict);
    const fs = require('fs');
    fs.writeFile(
      './routing/dailyDestinationList/dests.json',
      dictstring,
      (err, result) => {
        if (err) {
          console.log('error', err);
        }
      },
    );

    const { spawn } = require('child_process');
    const ls = spawn('python3', [
      './routing/routeCalculation.py',
      './routing/dailyDestinationList/dests.json',
      `${OPEN_ROUTE_API_KEY}`,
    ]);

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    ls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    res.status(200).send('Okay');
  });
});

// @description this Api call is specifically for the python script when it
// sends the result back after computation is done (which could take awhile)
// @params
// req.body.driverIds -> list of strings. Represent different drivers
// req.body.startLocation -> list of strings, eg. ['starting addr1','starting addr2'...]
// Driver Ids and startLocation need to be 1 to 1 corresponding. (At their own index)
// req.body.addressPairs -> list of strings, eg. ['pickup1','dropoff1','pickup2','dropoff2'...]
router.post('/saveRoutingOutput', (req, res) => {
  if (!req.body.hasOwnProperty('routes')) {
    res.status(400).send('Missing routes');
  }
  console.log('serverside log');
  console.log(req.body);
  const personalRoutes = [];
  req.body.routes.forEach((routingOutput) => {
    if (!routingOutput.hasOwnProperty('driverId')) {
      res.status(400).send('Missing driverId');
    }
    if (!routingOutput.hasOwnProperty('stop_ids')) {
      res.status(400).send('Missing stop_ids');
    }
    if (!routingOutput.hasOwnProperty('route')) {
      res.status(400).send('Missing route');
    }
    const personalRoute = new PersonalRoute({
      driverId: routingOutput.driverId,
      route: routingOutput.route,
      routeTime: routingOutput.routeTime,
    });
    personalRoute.save()
      .then((result) => {
        personalRoutes.push(result);
      })
      .catch((err) => {
        console.log(err);
        console.log(req);
        res.status(500).send(`${JSON.stringify(err)}`);
      });

    Driver.findOne({ _id: routingOutput.driverId }, (err, driver) => {
      if (err) {
        res.status(404).send('can\'t find driver');
      }
      // console.log('driver id:' + driver._id + ' route id: ' + personalRoute._id);
      // console.log('driver: ' , driver);
      driver.todaysRoute = personalRoute._id;
      // console.log('new driver: ' , driver);
      driver.save()
        .catch((err) => {
          console.log(err);
          res.status(500).send(`${JSON.stringify(err)}`);
        });
    });
  });
  // TODO change to success message
  res.status(200).send('success');
});

// @params
// Driver Id
router.post('/update-progress', (req, res) => {
  Driver.findOne({ _id: req.body.id }, (err, driver) => {
    if (err) {
      res.status(404).send('can\'t find driver');
    }
    // console.log('driver id:' + driver._id + ' route id: ' + personalRoute._id);
    // console.log('driver: ' , driver);
    const routeId = driver.todaysRoute._id;
    PersonalRoute.findOne({ _id: routeId }, (err, route) => {
      if (err) {
        res.status(404).send('can\'t find route');
      }
      route.currentIndex += 1;
      route.save()
        .catch((err) => {
          console.log(err);
          res.status(500).send(`${JSON.stringify(err)}`);
        });
    });
    res.status(200).send();
  });
});

module.exports = router;
