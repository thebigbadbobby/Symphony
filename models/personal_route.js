const mongoose = require('mongoose');

const { Schema } = mongoose;

const personalRouteSchema = new Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  // orderId
  // address
  route: [{
    type: Map,
    required: true,
  }],
  routeTime: {
    type: String,
    required: true,
  },
  currentIndex: {
    type: Number,
    default: 0,
    required: true,
  },
  started : {
    type: Boolean,
    default: false,
    required: true,
  },
  completed : {
    type: Boolean,
    default: false,
    required: true,
  },
}, { timestamps: true });

const PersonalRoute = mongoose.model('PersonalRoute', personalRouteSchema);
module.exports = PersonalRoute;
