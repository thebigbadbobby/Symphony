const mongoose = require('mongoose');

const { Schema } = mongoose;

const personalRouteSchema = new Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  route: [{
    type: Map,
    required: true,
  }],
  routeTime: {
    type: String,
    required: true,
  },
  currentIndex : {
    type: Number ,
    default: 0,
    required: true,
  },

}, { timestamps: true });

const PersonalRoute = mongoose.model('PersonalRoute', personalRouteSchema);
module.exports = PersonalRoute;
