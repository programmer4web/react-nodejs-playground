const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
 UserSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  bio: String,
  email: String,
  password: String,
  position: String,
  phone: String,
  wishlist: [],
  roles: [], // 'admin', 'associate'
  departments: [{type: Schema.Types.ObjectId, ref: 'Department'}]
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
