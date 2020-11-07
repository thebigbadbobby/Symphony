const mongoose = require('mongoose');

const { Schema } = mongoose;

const personalRouteSchema = new Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  route: {
    type: [String],
    required: true,
  },
  routeTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const PersonalRoute = mongoose.model('PersonalRoute', personalRouteSchema);
module.exports = PersonalRoute;
