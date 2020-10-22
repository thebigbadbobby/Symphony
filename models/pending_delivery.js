const mongoose = require('mongoose');

const { Schema } = mongoose;

const pendingDeliverySchema = new Schema({
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  googleMapsLink: {
    type: String,
  },
  // structure of an address
  // https://desktop.arcgis.com/en/arcmap/10.3/guide-books/geocoding/what-is-an-address.htm#:~:text=A%20common%20address%20format%20used,are%20presented%20in%20different%20formats.
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const PendingDelivery = mongoose.model('PendingDelivery', pendingDeliverySchema);
module.exports = PendingDelivery;
