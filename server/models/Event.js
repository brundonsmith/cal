
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Event = mongoose.model('Event', new Schema({
  calendar_id: { type: Schema.ObjectId, ref: 'Calendar' },
  title: String,
  date: Date,
}));

module.exports = Event;
