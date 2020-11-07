const express = require("express");
const twilio = require("twilio");
const PersonalRoute = require('../models/personal_route');
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
router.post("/computeRoute", (req, res) => {
  if (!req.body.hasOwnProperty("startLocation")) {
    res.status(400).send("Missing startLocation");
  }

  if (!req.body.hasOwnProperty("addressPairs")) {
    res.status(400).send("Missing addressPairs");
  }

  if (!req.body.hasOwnProperty("driverIDs")) {
    res.status(400).send("Missing driverIDs");
  }

  let dict = { startLocation: req.body.startLocation, driverIds:req.body.driverIds };
  dict["addressPairs"] = [];
  for (let i = 0; i < req.body.addressPairs.length; i += 2) {
    let pair = {};
    pair["pick-up-location"] = req.body.addressPairs[i];
    pair["drop-off-location"] = req.body.addressPairs[i + 1];
    dict["addressPairs"].push(pair);
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
  const personalRoutes = [];
  req.body.routes.forEach((routingOutput) => {
    if (!routingOutput.hasOwnProperty('driverId')) {
      res.status(400).send('Missing driverId');
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
        res.status(500).send(`${JSON.stringify(err)}`);
      });
  });
  // TODO change to success message
  res.send(`${JSON.stringify(personalRoutes)}`);
});

module.exports = router;
