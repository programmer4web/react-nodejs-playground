const mongoose = require('mongoose'),

 options = { discriminatorKey: 'type' },

 productSchema = new mongoose.Schema({
   name: String,
   description: String,
   price: {
    amount: Number,
    currency: String
  },
  images: [],
  package: String,
}, options);

mongoose.model('Product', productSchema);

module.exports = mongoose.model('Product');
