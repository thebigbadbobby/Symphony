const mongoose = require('mongoose');

const { Schema } = mongoose;

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
