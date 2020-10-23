const mongoose = require('mongoose');

const { Schema } = mongoose;

const ownerSchema = new Schema({
  fullName: {
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

const Owner = mongoose.model('Owner', ownerSchema);
module.exports = Owner;
