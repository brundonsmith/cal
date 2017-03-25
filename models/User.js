
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  name: String,
  calendars: [{
    type: Schema.Types.ObjectId,
    ref: 'Calendar',
  }],
}));

module.exports = User;
