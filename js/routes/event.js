
var mongoose = require('mongoose');
var middleware = require('../middleware');

const Calendar = mongoose.model('Calendar');
const Event = mongoose.model('Event');

module.exports = function(app) {

  app.get('/calendar/:calendarId/event/all', middleware.authenticate, middleware.decodeSession, function(req, res) {
    var calendarId = req.params.calendarId;

    Calendar.findOne({ calendar_id: calendarId, user_id: req.username })
      .then(function(calendar) {
        if(calendar) {
          return Event.find({ calendar_id: calendarId });
        } else {
          res.sendStatus(404);
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(events) {
        res.json(events);
      });
  });

  app.get('/calendar/:calendarId/event/:eventId', middleware.authenticate, middleware.decodeSession, function(req, res) {
    var calendarId = req.params.calendarId;
    var eventId = req.params.eventId;

    Calendar.findOne({ calendar_id: calendarId, user_id: req.username })
      .then(function(calendar) {
        if(calendar) {
          return Event.findOne({ _id: eventId, calendar_id: calendarId });
        } else {
          res.sendStatus(404);
        }
      })
      .catch(function(err) {
        console.error(err);
        res.sendStatus(404);
      })
      .then(function(event) {
        res.json(event);
      });
  });

  app.post('/calendar/:calendarId/event', middleware.authenticate, middleware.decodeSession, function(req, res) {
    var calendarId = req.params.calendarId;

    Calendar.findOne({ _id: calendarId, user_id: req.username })
      .then(function(calendar) {
        if(calendar) {
          var newEvent = new Event(req.body);
          newEvent.calendar_id = calendarId;
          return newEvent.save();
        } else {
          res.sendStatus(404);
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

  app.delete('/calendar/:calendarId/event/:eventId', middleware.authenticate, middleware.decodeSession, function(req, res) {
    var calendarId = req.params.calendarId;
    var eventId = req.params.eventId;

    Calendar.findOne({ _id: calendarId, user_id: req.username })
      .then(function(calendar) {
        if(calendar) {
          return Event.deleteOne({ _id: eventId, calendar_id: calendarId })
        } else {
          res.sendStatus(404);
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
