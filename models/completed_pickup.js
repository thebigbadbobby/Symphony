const mongoose = require('mongoose');

const { Schema } = mongoose;

const completedPickupSchema = new Schema({
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  deliveries: [{ type: Schema.Types.ObjectId, ref: 'CompletedDelivery' }],
}, { timestamps: true });

const CompletedPickup = mongoose.model('CompletedPickup', completedPickupSchema);
module.exports = CompletedPickup;
