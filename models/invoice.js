const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceSchema = new Schema({
    email: { 
        type: String,
        required: true
    },
  total: { 
    type: Number,
    required: true
    },
  items: { 
    type: String,
    required: true
  },
  address: { 
    type: String,
    required: false
  },
  fulfilled: { 
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;