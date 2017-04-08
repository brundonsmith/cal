
var mongoose = require('mongoose');
const Calendar = mongoose.model('Calendar');
const Event = mongoose.model('Event');

module.exports = function(app) {

  app.get('/calendar/:calendarId/event/all', function(req, res) {
    var calendarId = req.params.calendarId;

    Event.find({ calendar_id: calendarId })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(events) {
        res.json(events);
      });
  });

  app.get('/calendar/:calendarId/event/all/:eventId', function(req, res) {
    var calendarId = req.params.calendarId;
    var eventId = req.params.eventId;

    Event.find({ _id: eventId, calendar_id: calendarId })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(event) {
        res.json(event);
      });
  });

  app.post('/calendar/:calendarId/event', function(req, res) {
    var calendarId = req.params.calendarId;

    Calendar.findOne({ _id: calendarId })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(calendar) {
        if(calendar === null) {
          res.sendStatus(404);
        } else {
          var newEvent = new Event(req.body);
          newEvent.calendar_id = calendarId;
          return newEvent.save();
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(500);
      })
      .then(function() {
        res.sendStatus(200);
      });
  });

  app.delete('/calendar/:calendarId/event/:eventId', function(req, res) {
    var calendarId = req.params.calendarId;
    var eventId = req.params.eventId;

    Calendar.findOne({ _id: id })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(calendar) {
        if(calendar === null) {
          res.sendStatus(404);
        } else {
          var event = Event.deleteOne({ _id: eventId })
            .catch(function(err) {
              console.error(err);
              res.sendStatus(404);
            });
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(500);
      })
      .then(function() {
        res.sendStatus(200);
      });
  });

};
