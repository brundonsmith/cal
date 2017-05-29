
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Calendar = mongoose.model('Calendar', new Schema({
  user_id: { type: String, ref: 'User' },
  name: String,
}));

module.exports = Calendar;
