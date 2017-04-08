
// node modules
var express = require('express');
var bodyParser = require('body-parser');
var promise = require('promise');
var mongoose = require('mongoose');
var cors = require('cors');

// init
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = promise;
mongoose.connect(process.env.DB_URI, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

// define models
require('./models');

// define routes
require('./routes/calendar')(app);
require('./routes/contact')(app);
require('./routes/event')(app);
require('./routes/note')(app);
require('./routes/user')(app);

// start
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(`Cal listening on port ${listener.address().port}`)
})
