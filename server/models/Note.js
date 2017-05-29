
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  user_id: { type: String, ref: 'User' },
  date: Date,
  content: String,
  isMarkdown: Boolean,
});
NoteSchema.index({ content: 'text' });
NoteSchema.methods.getTitle = function() {
  return this.content.indexOf('\n') > -1 ? this.content.split('\n')[0] : this.content;
};

const Note = mongoose.model('Note', NoteSchema);


module.exports = Note;
