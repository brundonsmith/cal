
var mongoose = require('mongoose');
var crud = require('./_basic_crud');

const Contact = mongoose.model('Contact');

module.exports = function(app) {

  crud.defineReadAll(Contact, app);

  crud.defineRead(Contact, app);

  crud.defineCreate(Contact, app);

  crud.defineUpdate(Contact, app);

  crud.defineDelete(Contact, app);

};
