const mongoose = require('mongoose');

const { Schema } = mongoose;

// how to do referencing in mongoose
// https://mongoosejs.com/docs/populate.html
const deliverySchema = new Schema({
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
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

const Delivery = mongoose.model('CompletedDelivery', completedDeliverySchema);
module.exports = Delivery;
