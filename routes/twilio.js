const express = require('express');
const router = express.Router();
const { MessagingResponse } = require('twilio').twiml;

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  const message = twiml.message();
  // message.body('The Robots are coming! Head for the hills!');

  if (req.body.Body === 'hello') {
    twiml.message('Hi!');
  } else if (req.body.Body === 'bye') {
    twiml.message('Goodbye');
  } else {
    twiml.message('No Body param match, Twilio sends this in the request to your server. Heres a robot');
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

module.exports = router;
