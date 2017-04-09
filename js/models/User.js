
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  password: String, //TODO Use hash instead of actual password!
}));

module.exports = User;
