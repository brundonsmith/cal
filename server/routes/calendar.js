
var mongoose = require('mongoose');
var crud = require('./_basic_crud');

const Calendar = mongoose.model('Calendar');

module.exports = function(app) {

  crud.defineReadAll(Calendar, app, function(results) {
    return Promise.all(results.map((result) => result.populateEvents())).then((all) => {
      return all;
    });
  });

  crud.defineRead(Calendar, app, (result) => result.populateEvents());

  crud.defineCreate(Calendar, app);

  crud.defineUpdate(Calendar, app);

  crud.defineDelete(Calendar, app);

};
