
var mongoose = require('mongoose');
var crud = require('./_basic_crud');
var middleware = require('../middleware');

const Note = mongoose.model('Note');

module.exports = function(app) {

    //crud.defineReadAll(Note, app);
    app.get('/note/all', middleware.authenticate, middleware.decodeSession, function (req, res) {
      var pageLength = req.query.pageLength;
      var pageNumber = req.query.pageNumber;
      var searchString = req.query.q;
      // TODO: Implement paging

      var criteria;
      if(searchString) {
        criteria = {
          user_id: req.username,
          $text : { $search : searchString },
        }
      } else {
        criteria = {
          user_id: req.username,
        }
      }
      
      Note.find(criteria)
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        })
        .then(function(objects) {
          res.json(objects);
        });
    });

    crud.defineRead(Note, app);

    crud.defineCreate(Note, app);

    crud.defineUpdate(Note, app);

    crud.defineDelete(Note, app);
};
