const mongoose = require('mongoose');

const { Schema } = mongoose;

const pendingPickupSchema = new Schema({
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  deliveries: [{ type: Schema.Types.ObjectId, ref: 'PendingDelivery'}],
}, { timestamps: true });

const PendingPickup = mongoose.model('PendingPickup', pendingPickupSchema);
module.exports = PendingPickup;
