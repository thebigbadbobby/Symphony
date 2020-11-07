const mongoose = require('mongoose');

const { Schema } = mongoose;

const personalRouteSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  route: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

const PersonalRoute = mongoose.model('PersonalRoute', personalRouteSchema);
module.exports = PersonalRoute;
