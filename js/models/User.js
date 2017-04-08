
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  // password hash
}));

module.exports = User;
