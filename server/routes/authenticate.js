
var mongoose = require('mongoose');
var jwt = require("jwt-simple");
var crypto = require('crypto');

const User = mongoose.model('User');

module.exports = function(app) {

  app.post('/api/authenticate', function(req, res) {
    if (req.body.username && req.body.password) {
      var username = req.body.username;
      var password = req.body.password;

      var user = User.findOne({ _id: username })
        .then(function(user) {
          if (user && user.validatePassword(password)) {
            var payload = {
              username: user._id,
              salt: crypto.randomBytes(16).join(''),
            };
            var token = jwt.encode(payload, process.env.JWT_SECRET);
            res.json({
              token: token,
            });
          } else {
            res.sendStatus(404);
          }
        });
    } else {
        res.sendStatus(404);
    }
  });

};
