const mongoose = require('mongoose');

const { Schema } = mongoose;

const requestSchema = new Schema({
  customerID: {
    type: String,
    required: true,
  },
  businessID: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    required: false,
  },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
