const mongoose = require('mongoose'),
 UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  wishlist: []
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
