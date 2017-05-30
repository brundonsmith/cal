
var apiRoot = '';/*'http://localhost:8080';//*//*'https://shielded-wave-87292.herokuapp.com';//*/

var headers = {
  'Content-Type': 'application/json',
};

module.exports = {

  login: function(username, password) {
    return fetch(`${apiRoot}/api/login`, { method: 'POST', headers: headers })
      .then((response) => response.json())
      .then((response) => {

      });
  },

  logout: function(noteId) {
    return fetch(`${apiRoot}/api/note/${noteId}`, { method: 'GET', headers: headers })
      .then(loginRedirect)
      .then((response) => response.json())
  },

};
