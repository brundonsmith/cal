
var mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = function(app) {

  app.post('/user', function (req, res) {
    var newUser = new User(req.body);

    newUser.save()
      .catch(function(err) {
        console.error(err);
        res.sendStatus(500);
      })
      .then(function() {
        res.sendStatus(200);
      });
  });

};
