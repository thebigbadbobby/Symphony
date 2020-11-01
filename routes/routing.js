const express = require('express');
const { route } = require('./business');
const router = express.Router();

// @description get route for one specific driver
// @params
// driverID
// @payload
// The routing info for that driver, detail TBD
router.get('/route', (req, res) => {

    res.send(req.body);

});

// @description compute route for drivers
// @params
// list of address
// addresses:['pickup1','dropoff1','pickup2','dropoff2'...]
router.post('/computeRoute', (req, res) => {
    if (!req.body.hasOwnProperty('addresses')) {
        res.status(400).send('Missing addresses');
    }
    const spawn = require('child_process').spawn;
    const ls = spawn('python', ['./routing/computeRoute.py']);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    ls.stderr.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    res.status(200).send('Okay');
});

module.exports = router;