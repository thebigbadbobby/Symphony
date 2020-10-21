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
  geolocation: {
    type: String,
  },
  googleMapsLink: {
    type: String,
  },
  // structure of an address
  // https://desktop.arcgis.com/en/arcmap/10.3/guide-books/geocoding/what-is-an-address.htm#:~:text=A%20common%20address%20format%20used,are%20presented%20in%20different%20formats.
  address: {
    houseNumber: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    streetType: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      validate: {
        validator(v) {
          return /\d{5}/.test(v);
        },
        message: (props) => `${props.value} is not a valid zip code!`,
      },
    },
  },
}, { timestamps: true });

const CompletedDelivery = mongoose.model('CompletedDelivery', completedDeliverySchema);
module.exports = CompletedDelivery;
