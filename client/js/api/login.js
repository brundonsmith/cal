
var apiRoot = '';/*'http://localhost:8080';//*//*'https://shielded-wave-87292.herokuapp.com';//*/

var headers = {
  'Content-Type': 'application/json',
};

module.exports = {

  authenticate: function(username, password) {
    return fetch(`${apiRoot}/api/authenticate`, { method: 'POST', headers: headers, body: JSON.stringify({ username, password }) })
  },

};
