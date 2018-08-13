const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  options = { discriminatorKey: 'type' },

 productSchema = new Schema({
   name: String,
   description: String,
   price: {
    amount: Number,
    currency: String
  },
  images: [],
  package: String,
  department: [{type: Schema.Types.ObjectId, ref: 'Department'}],
  status: String
}, options);

mongoose.model('Product', productSchema);

module.exports = mongoose.model('Product');
