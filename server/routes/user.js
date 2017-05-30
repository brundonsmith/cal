
var mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = function(app) {

  app.post('/api/user', function (req, res) {
    var username = req.body.username;
    req.body.username = undefined;
    var password = req.body.password;
    req.body.password = undefined;

    var newUser = new User(req.body);
    newUser._id = username;
    newUser.setPassword(password);

    newUser.save()
      .catch(function(err) {
        console.error(err);
        res.sendStatus(500);
      })
      .then(function() {
        res.sendStatus(200);
      });
  });

  // TODO: On user delete, remember to delete all obejcts owned by user

};
