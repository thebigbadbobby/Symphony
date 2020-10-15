// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC6685ca9e7a76c443fab749516bdda464';
const authToken = '23b776c3e6d071550b54bdfcdfddbc2f';
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
