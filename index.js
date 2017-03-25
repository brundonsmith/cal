
// node modules
var express = require('express');
var bodyParser = require('body-parser');
var promise = require('promise');
var mongoose = require('mongoose');


// server components
var models = require('./models');
var routes = require('./routes');


// init
var app = express();
app.use(bodyParser());

mongoose.Promise = promise;
mongoose.connect(process.env.DB_URI, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});


// routes
app.get('/calendar/all', function (req, res) {

  models.Calendar.find()
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

  models.Calendar.findOne({ _id: id })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(404);
    })
    .then(function(calendar) {
      res.json(calendar);
    });
});

app.post('/calendar', function (req, res) {
  var calendar = new models.Calendar(req.body);

  calendar.save()
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

  models.Calendar.deleteOne({ _id: id })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(404);
    })
    .then(function(result) {
      res.json(result);
    });
});

app.post('/calendar/:id/event', function(req, res) {
  var calendarId = req.params.id;

  models.Calendar.findOne({ _id: id })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(404);
    })
    .then(function(calendar) {
      calendar.events.push(req.body);
      return calendar.save();
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    })
    .then(function() {
      res.sendStatus(200);
    });
});


// start
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(`Cal listening on port ${listener.address().port}`)
})
