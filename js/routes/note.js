
var mongoose = require('mongoose');
var crud = require('./_basic_crud');

const Note = mongoose.model('Note');

module.exports = function(app) {

    crud.defineReadAll(Note, app);

    crud.defineRead(Note, app);

    crud.defineCreate(Note, app);

    crud.defineUpdate(Note, app);

    crud.defineDelete(Note, app);

};
