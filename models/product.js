const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  itemName: {
    type: String,
    required: [true, 'Item name required'],
  },
  businessID: {
    type: String,
    required: false,
  },
  requestAvail: {
    type: Boolean,
    required: false,
  },
  reqCheckoutDuration: {
    type: Number,
    required: false,
  },
  returnOpt: {
    type: Array,
    required: false,
  },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;