
// node modules
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var promise = require('promise');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

// express
var app = express();

// middleware
if(process.env.HEADLESS) {
  app.use(cors());
} else {
  app.use(express.static('public'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// passport
passport.use(new Strategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  },
  function(payload, done) {
    var user = mongoose.model('User').findOne({ _id: payload.username }) || null;
    if (user) {
      return done(null, {
        username: user._id
      });
    } else {
      return done(new Error("User not found"), null);
    }
  }
));
app.use(passport.initialize());

// mongoose
mongoose.Promise = promise;
mongoose.connect(process.env.DB_URI, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});


// define models
require('./models');

// define routes
app.get('/notes', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/notes.html'));
});
app.get('/calendar', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/calendar.html'));
});
app.get('/contacts', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/contacts.html'));
});

require('./routes/authenticate')(app);
require('./routes/calendar')(app);
require('./routes/contact')(app);
require('./routes/event')(app);
require('./routes/note')(app);
require('./routes/user')(app);

// start
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(`Cal listening on port ${listener.address().port}`)
})
