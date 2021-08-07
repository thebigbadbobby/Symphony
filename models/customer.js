const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false
  },
  bread: {
    type: Array,
    required: false,
  },
  stripeCustomerID: {
    type: String,
    required: false,
  },
  stripePaymentMethod: {
    type: String,
    required: false,
  },
  receipts:{
    type: Array,
    required: false
  },
  invoices:{
    type: Array,
    required: false
  },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;