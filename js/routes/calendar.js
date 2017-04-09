
var mongoose = require('mongoose');
var crud = require('./_basic_crud');

const Calendar = mongoose.model('Calendar');

module.exports = function(app) {

  crud.defineReadAll(Calendar, app);

  crud.defineRead(Calendar, app);

  crud.defineCreate(Calendar, app);

  crud.defineUpdate(Calendar, app);

  crud.defineDelete(Calendar, app);

};
