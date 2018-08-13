const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  departmentSchema = new mongoose.Schema({
    name: String,
    abbreviation: String,
    description: String
  });

mongoose.model('Department', departmentSchema);
module.exports = mongoose.model('Department');
