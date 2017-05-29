
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

const UserSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  passwordInfo: {
    hash: String,
    salt: String,
    iterations: Number,
    length: Number,
  },
});

UserSchema.methods.setPassword = function( password ) {
  var salt = crypto.randomBytes(128).toString('base64');
  var iterations = 10000;
  var length = 512;
  var hash = crypto.pbkdf2Sync(password, salt, iterations, length).toString();

  this.passwordInfo = {
    hash: hash,
    salt: salt,
    iterations: iterations,
    length: length,
  };
};

UserSchema.methods.validatePassword = function( passwordAttempt ) {
  var hash = this.passwordInfo.hash;
  return hash === crypto.pbkdf2Sync(passwordAttempt, this.passwordInfo.salt, this.passwordInfo.iterations, this.passwordInfo.length).toString();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
