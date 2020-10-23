const mongoose = require('mongoose');

const { Schema } = mongoose;

const completedOrderSchema = new Schema({
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
  deliveries: [{ type: Schema.Types.ObjectId, ref: 'Delivery' }],
}, { timestamps: true });

const CompletedOrder = mongoose.model('CompletedOrder', completedOrderSchema);
module.exports = CompletedOrder;
