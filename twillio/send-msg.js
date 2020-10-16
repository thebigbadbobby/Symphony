// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const reservedPhoneNumber = '+14302390178';
exports.send_msg = (msg, to) => {
  client.messages
    .create({
      body: msg,
      from: reservedPhoneNumber,
      to,
    })
    .then((message) => console.log(message.sid));
};
