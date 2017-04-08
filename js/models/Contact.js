
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Contact = mongoose.model('Contact', new Schema({
  user_id: { type: String, ref: 'User' },
  firstName: String,
  lastName: String,
  emailAddresses: [ String ],
  phoneNumbers: [ String ],
}));

module.exports = Contact;
