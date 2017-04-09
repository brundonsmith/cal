
var mongoose = require('mongoose');
var jwt = require("jwt-simple");

const User = mongoose.model('User');

module.exports = function(app) {

  app.post('/authenticate', function(req, res) {
    if (req.body.username && req.body.password) {
      var username = req.body.username;
      var password = req.body.password;

      var user = User.find({ _id: username, password: password })
        .then(function(user) {
          if (user) {
            var payload = {
              username: user._id
            };
            var token = jwt.encode(payload, process.env.JWT_SECRET);
            res.json({
              token: token
            });
          } else {
            res.sendStatus(401);
          }
        });
    } else {
        res.sendStatus(401);
    }
  });

};
