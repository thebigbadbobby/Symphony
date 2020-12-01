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
    ref: 'PersonalRoute',
  },
  startLocation: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['idle', 'checkin', 'ready', 'onWay'],
    default: 'idle',
    required: true,
  },
  locality: {
    type: String,
    enum: ['auburn', 'santa cruz'],
    required: true,
  },
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
