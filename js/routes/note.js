
var mongoose = require('mongoose');

module.exports = function(app) {

    app.get('/note/all', function (req, res) {
      var pageLength = req.query.pageLength;
      var pageNumber = req.query.pageNumber;
      // TODO: Implement paging

      mongoose.model('Note').find()
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        })
        .then(function(notes) {
          res.json(notes);
        });
    });

    app.get('/note/:id', function (req, res) {
      var id = req.params.id;

      mongoose.model('Note').findOne({ _id: id })
        .catch(function(err) {
          console.error(err);
          res.sendStatus(404);
        })
        .then(function(note) {
          res.json(note);
        });
    });

    app.post('/note', function (req, res) {
      var newNote = new mongoose.model('Note')(req.body);

      newNote.save()
        .catch(function(err) {
          console.error(err);
          res.sendStatus(500);
        })
        .then(function() {
          res.sendStatus(200);
        });
    });

    app.delete('/note/:id', function (req, res) {
      var id = req.params.id;

      mongoose.model('Note').deleteOne({ _id: id })
        .catch(function(err) {
          console.error(err);
          res.sendStatus(404);
        })
        .then(function(result) {
          res.json(result);
        });
    });

};
