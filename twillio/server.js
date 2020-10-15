const http = require('http');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

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

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
