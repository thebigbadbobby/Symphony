const mongoose = require('mongoose');

const { Schema } = mongoose;

const businessSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessPhone: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  pickupTimes24hr: {
    type: [Number],
    required: true,
  },
  owners: [{
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  }],
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
