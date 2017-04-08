
var mongoose = require('mongoose');

const Calendar = mongoose.model('Calendar');

module.exports = function(app) {

  app.get('/calendar/all', function (req, res) {

    Calendar.find()
      .catch(function(err) {
        console.error(err);
        res.sendStatus(500);
      })
      .then(function(calendars) {
        res.json(calendars);
      });
  });

  app.get('/calendar/:id', function (req, res) {
    var id = req.params.id;

    Calendar.findOne({ _id: id })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(calendar) {
        res.json(calendar);
      });
  });

  app.post('/calendar', function (req, res) {
    var newCalendar = new Calendar(req.body);

    newCalendar.save()
      .catch(function(err) {
        console.error(err);
        res.sendStatus(500);
      })
      .then(function() {
        res.sendStatus(200);
      });
  });

  app.delete('/calendar/:id', function (req, res) {
    var id = req.params.id;

    Calendar.deleteOne({ _id: id })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(result) {
        res.json(result);
      });
  });

};
