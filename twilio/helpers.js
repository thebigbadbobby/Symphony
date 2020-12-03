// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const PendingOrder = require('../models/pending_order');

let reservedPhoneNumber;
if (process.env.DEV_MODE === 'FALSE') {
  reservedPhoneNumber = process.env.RESERVED_PHONE_NUMBER;
} else {
  reservedPhoneNumber = process.env.DEV_PHONE_NUMBER;
}

/**
 * @description Function that simply sends a twilio message
 * @param {string} msg - the message
 * @param {string} to - the number of the person to send to
 * @returns {Promise}
 */
exports.sendMsg = (msg, to) => client.messages
  .create({
    body: msg,
    from: reservedPhoneNumber,
    to,
  });

/**
 * @description Function that simply sends a twilio message
 * @param {string} msg - the message
 * @param {string} media - a url with the image
 * @param {string} to - the number of the person to send to
 * @returns {Promise}
 */
exports.sendMediaMsg = (msg, media, to) => client.messages
  .create({
    body: msg,
    from: reservedPhoneNumber,
    to,
    mediaUrl: media,
  });

/**
 * @description Function that takes out anything that isn't a char or number,
 * converts to lowercase, and compares the numbers
 * @param {string} message
 * @param {string} messageToCompareTo
 * @returns {boolean}
 */
exports.textCompare = (message, messageToCompareTo) => {
  const cleanedMessage = message.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const cleanedCompare = messageToCompareTo.toLowerCase().replace(/[^a-z0-9]/gi, '');
  return cleanedMessage.includes(cleanedCompare);
};

/**
 * @description takes in a number in the format +12345567890 and prints it in our desired format
 * @param {string} phoneNumberString
 * @returns {string | null}
 */
exports.formatPhoneNumber = (phoneNumberString) => {
  const cleaned = (`${phoneNumberString}`).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    // var intlCode = (match[1] ? '+1 ' : '')
    return [match[2], '-', match[3], '-', match[4]].join('');
  }
  return null;
};

/** Helper function that takes in an order */
exports.getOrdersFromOrderIds = (orderIds) => {
  const promises = orderIds.map((orderId) => new Promise((resolve, reject) => {
    PendingOrder.findById(orderId)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  }));
  return Promise.all(promises);
};
