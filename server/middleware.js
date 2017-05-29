
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var jwt = require('jwt-simple');

module.exports = {

  authenticate: passport.authenticate("jwt", { session: false }),

  decodeSession: function(req, res, next) {
    var token = ExtractJwt.fromAuthHeader()(req);
    req.username = jwt.decode(token, process.env.JWT_SECRET).username;
    next();
  },

}
