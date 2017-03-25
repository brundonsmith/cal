
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Calendar = mongoose.model('Calendar', new Schema({
  name: String,
  events: [
    {
      name: String,
      date: Date,
    }
  ]
}));

module.exports = Calendar;
