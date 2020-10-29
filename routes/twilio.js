const express = require('express');

const router = express.Router();
const { MessagingResponse } = require('twilio').twiml;

router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  const message = twiml.message();
  // message.body('The Robots are coming! Head for the hills!');

  if (req.body.Body === 'hello') {
    message.body('Hi!');
  } else if (req.body.Body === 'bye') {
    message.body('Goodbye');
  } else if (req.body.Body === 'robot') {
    twiml.message('Here\'s a robot');
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  } else {
    message.body('No Body param match.');
  }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

module.exports = router;
