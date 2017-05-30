
var headers = require('utilities').headers;

module.exports = {

  login: function(username, password) {
    return fetch(`/api/authenticate`, { method: 'POST', headers: headers(), body: JSON.stringify({ username, password }) })
  },

};
