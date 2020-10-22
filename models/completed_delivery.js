const mongoose = require('mongoose');

const { Schema } = mongoose;

// how to do referencing in mongoose
// https://mongoosejs.com/docs/populate.html
const completedDeliverySchema = new Schema({
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
  googleMapsLink: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const CompletedDelivery = mongoose.model('CompletedDelivery', completedDeliverySchema);
module.exports = CompletedDelivery;
