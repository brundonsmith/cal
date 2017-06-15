
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = require('./Event');

const CalendarSchema = new Schema({
  user_id: { type: String, ref: 'User' },
  name: String,
  color: { type: String, default: '#009688' },
  events: { type: Array }
})

CalendarSchema.methods.populateEvents = function() {
  var calendar = this;
  return Event.find({ calendar_id: calendar._id })
    .then(function(results) {
      console.log(results)
      calendar.events = results;
      return calendar;
    });
};

const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;
