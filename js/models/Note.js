
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Note = mongoose.model('Note', new Schema({
  user_id: { type: String, ref: 'User' },
  date: Date,
  title: String,
  body: String,
  isMarkdown: Boolean,
}));

module.exports = Note;
