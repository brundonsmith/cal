
// node modules
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
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
