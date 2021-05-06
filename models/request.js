const mongoose = require('mongoose');

const { Schema } = mongoose;

const requestSchema = new Schema({
  customerID: {
    type: String,
    ref: 'Product',
    required: true,
  },
  businessID: {
    type: String,
    ref: 'Business',
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
  itemName:{
    type: String,
    required: true,

  },
  price:{
    type: Number,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  deliveryInfo:{
    type: String,
    required: false,
  },
  returnOpt:{
    type: Array,
    required: false,
  },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
