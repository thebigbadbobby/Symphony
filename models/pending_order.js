const mongoose = require('mongoose');

const { Schema } = mongoose;

const pendingOrderSchema = new Schema({
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  customer_name: {
    type: String,
  },
  customer_phone: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const PendingOrder = mongoose.model('Pending Order', pendingOrderSchema);
module.exports = PendingOrder;
