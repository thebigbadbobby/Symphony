const mongoose = require('mongoose');

const { Schema } = mongoose;

const driverSchema = new Schema({
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
  ordersDelivering: [{
    type: Schema.Types.ObjectId,
    ref: 'PendingOrder',
    required: true,
  }],
  todaysRoute: {
    type: Schema.Types.ObjectId,
    ref: 'personal_route',
    required: true,
  },
  startLocation: {
    type: String
  }
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
