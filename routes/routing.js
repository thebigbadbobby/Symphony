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
  OPEN_ROUTE_API_KEY = process.env.OPEN_ROUTE_API_KEY_DEV;
}

// @description get route for one specific driver
// @params
// driverId
// @payload
// The routing info for that driver, detail TBD
router.get('/routeUrl', async (req, res) => {
  let route = [];
  const addresses = [];
  const links = [];
  if (!req.query.driverId) {
    res.status(404).send('driverId required');
    return;
  }
  const body = JSON.parse(req.query.driverId);
  const driver = await Driver.findById(body);
  if (!driver) {
    res.status(404).send('can\'t find driver');
    return;
  }
  const routeId = driver.todaysRoute;
  const personalRoute = await PersonalRoute.findById(routeId);
  if (!personalRoute) {
    res.status(404).send('can\'t find route');
    return;
  }
  route = personalRoute.route.slice(1);
  route.forEach((routeObj, index) => {
    if (index === 0) {
      addresses.push(encodeURIComponent(routeObj.get('address')));
    } else {
      // get rid of duplicate addresses because it breaks google maps links
      const currStop = routeObj.get('address');
      const prevStop = route[index - 1].get('address');

      if (prevStop !== currStop) {
        addresses.push(encodeURIComponent(currStop));
      }
    }
  });
  let stopNum = 0;
  let link = 'https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&waypoints=';
  for (let i = 0; i < addresses.length; i++) {
    // if we are on the last address, ignore
    if (i === addresses.length - 1) {
      break;
    }
    if (stopNum === 9) {
      // add the destination (10th stop because current location counts as a waypoint)
      const finalLink = `${link.substring(0, link.lastIndexOf('%7C'))}&destination=${addresses[stopNum]}`;
      links.push(finalLink);

      link = 'https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&waypoints=';

      stopNum = 0;
    } else {
      link += `${addresses[i]}%7C`;
      stopNum += 1;
    }
  }

  // if %7C is not found and we blindly did this, we would delete the whole beginning of the string.
  if (link.lastIndexOf('%7C') >= 0) {
    const finalLink = `${link.substring(0, link.lastIndexOf('%7C'))}&destination=${addresses[addresses.length - 1]}`;
    links.push(finalLink);
  } else {
    const finalLink = `${link}&destination=${addresses[addresses.length - 1]}`;
    links.push(finalLink);
  }

  res.status(200).send(links);
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
        if (doc == undefined) {
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
router.post('/computeRoute', async (req, res) => {
  // fetch info from db.

  const dict = {};
  // fetch all pending orders
  dict["orderInfo"] = await getAllOrder();
  if (dict["orderInfo"].length==0){
    console.log('there\'re no pendingOrders today, scirpt ends');
    return;
  }else {
    console.log(dict);
  }

  // fetch all(one, for now) driver id
  Driver.find({'state':'checkin'}, async (err, docs) => {
    if (err) {
      console.log(err);
      return;
    }
    if (docs.length == 0){
      console.log('No driver available');
      return
    }
    dict.driverInfo = [];
    for (let i = 0; i < docs.length; i += 1) {
      const info = {};
      info.driverId = docs[i]._id;
      info.startLocation = docs[i].startLocation;
      dict.driverInfo.push(info);
    }

    
    let dictstring = JSON.stringify(dict);
    const fs = require("fs");
    const today = (new Date().getTime() / 1000).toFixed(0);
    fs.writeFile(
      `./routing/dailyDestinationList/${today}.json`,
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
      `./routing/dailyDestinationList/${today}.json`,
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
  const promises = [];
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
    if (routingOutput.route.length <= 1){
      // this driver is not assigned any route. This could be happen when there's more driver than order
      return;
    }

    let routeLocal = routingOutput.route;
    let orders = [];
    routeLocal[0]['type'] = '';
    for (i = 1; i<routeLocal.length; i++) {
      let stop = routeLocal[i];
      if (orders.includes(stop.orderId)) {
        stop['type'] = 'dropoff';
      } else {
        orders.push(stop.orderId);
        stop['type'] = 'pickup';
      }
      stop['orderId'] = [stop['orderId']];
    }
    for (i = 1; i<routeLocal.length-1; i++) {
      if(routeLocal[i]['type'] == routeLocal[i+1]['type'] &&
        routeLocal[i]['address'] == routeLocal[i+1]['address']) {
          routeLocal[i]['orderId'].push(routeLocal[i+1]['orderId'][0]);
          routeLocal.splice(i+1, 1);
          i -= 1;
      }
    }

    const personalRoute = new PersonalRoute({
      driverId: routingOutput.driverId,
      route: routeLocal,
      routeTime: routingOutput.routeTime
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
      promises.push(new Promise((resolve, reject) => {
        driver.save().then((result) => {
          resolve(result);
        })
          .catch((error) => {
            reject(error);
          });
      }));
    });
  });
  Promise.all(promises).then((success) => {
    res.status(200).send(success);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(`${JSON.stringify(err)}`);
  });
});

// @params
// Driver Id
// TODO reject if route already complete
router.post('/update-progress', (req, res) => {
  Driver.findOne({ _id: req.body.id }, (err, driver) => {
    if (err) {
      res.status(404).send(`can't find driver`);
      return;
    }
    // console.log('driver id:' + driver._id + ' route id: ' + personalRoute._id);
    // console.log('driver: ' , driver);
    const routeId = driver.todaysRoute._id;
    PersonalRoute.findOne({ _id: routeId }, (err, route) => {
      if (err) {
        res.status(404).send(`can't find route`);
        return;
      }
      if (route.currentIndex >= route.route.length-1){
        res.status(403).send(`route already completed`);
        return;
      }
      if(route.currentIndex == 0) {
        route.started = true;
      }
      // eslint-disable-next-line no-param-reassign
      route.currentIndex += 1;
      if (route.currentIndex == route.route.length-1) {
        route.completed = true;
      }
      route.save()
        .then((saved) => {
          res.status(200).send(saved);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(`${JSON.stringify(error)}`);
        });
    });
  });
});

module.exports = router;
