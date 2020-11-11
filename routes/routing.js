const express = require("express");
const twilio = require("twilio");
const PersonalRoute = require('../models/personal_route');
const Driver = require('../models/driver');
const router = express.Router();

// @description get route for one specific driver
// @params
// driverID
// @payload
// The routing info for that driver, detail TBD
router.get("/route", (req, res) => {
  res.send(req.body);
});

// @description Invoke python script to compute route for drivers. 
// This function does not get nor save the result of rouing, 
// the python script will invoke another api call to do that. See /saveRoutingOutput
// @params
// req.body.driverIds -> list of strings. Represent different drivers
// req.body.startLocation -> list of strings, eg. ['starting addr1','starting addr2'...]
// Driver Ids and startLocation need to be 1 to 1 corresponding. (At their own index)
// req.body.addressPairs -> list of strings, eg. ['pickup1','dropoff1','pickup2','dropoff2'...]
// req.body.orderIds -> list of strings, eg. ['orderId1', 'orderId2', 'orderId3']
router.post("/computeRoute", (req, res) => {
  if (!req.body.hasOwnProperty("startLocation")) {
    res.status(400).send("Missing startLocation");
  }

  if (!req.body.hasOwnProperty("addressPairs")) {
    res.status(400).send("Missing addressPairs");
  }

  if (!req.body.hasOwnProperty("driverIds")) {
    res.status(400).send("Missing driverIDs");
  }
  dict = {};
  dict["driverInfo"] = []
  for (let i =0;  i < req.body.driverIds.length; i += 1){
    let info = {};
    info["driverId"] = req.body.driverIds[i];
    info["startLocation"] = req.body.startLocation[i];
    dict["driverInfo"].push(info);
  }

  dict["orderInfo"] = [];
  for (let i = 0; i < req.body.orderIds.length; i += 1) {
    let info = {};
    info["pick-up-location"] = req.body.addressPairs[i*2];
    info["drop-off-location"] = req.body.addressPairs[i*2 + 1];
    info["orderId"] = req.body.orderIds[i]
    dict["orderInfo"].push(info);
  }

  let dictstring = JSON.stringify(dict);
  const fs = require("fs");
  fs.writeFile(
    "./routing/dailyDestinationList/dests.json",
    dictstring,
    function (err, result) {
      if (err) console.log("error", err);
    }
  );

  const spawn = require("child_process").spawn;
  const ls = spawn("python", [
    "./routing/routeCalculation.py",
    "./routing/dailyDestinationList/dests.json",
  ]);

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  ls.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });
  res.status(200).send("Okay");
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
      routeTime: routingOutput.routeTime
    });
    personalRoute.save()
      .then((result) => {
        personalRoutes.push(result);
      })
      .catch((err) => {
        console.log(err);
        console.log(req)
        res.status(500).send(`${JSON.stringify(err)}`);
      });

    Driver.findOne({ _id: routingOutput.driverId }, (err, driver) => {
      if (err) {
        res.status(404).send(`can't find driver`);
      }
      driver.todaysRoute = personalRoute._id;
      driver.save()
        .catch((err) => {
          console.log(err);
          res.status(500).send(`${JSON.stringify(err)}`);
        });
    });


  });
  // TODO change to success message
  res.status(200).send(`success`);
});

module.exports = router;
