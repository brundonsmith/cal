
var apiRoot = '';/*'http://localhost:8080';//*//*'https://shielded-wave-87292.herokuapp.com';//*/

var headers = {
  'Content-Type': 'application/json',
  'Authorization': 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0cmlwZXMiLCJzYWx0IjoiMTk0NDQxNTcxMzIyMjE1Njg5MjIwMjgyMTE1NTIwNzk1MjA3MjM4MTcyIn0.GSx36LDSBpjr6gfB-rEkzAMefy6sZxFAXDjgiYuefBs',
};

module.exports = {

  getAllNotes: function() {
    return fetch(`${apiRoot}/note/all`, { method: 'GET', headers: headers })
      .then((response) => response.json())
  },

  getNote: function(noteId) {
    return fetch(`${apiRoot}/note/${noteId}`, { method: 'GET', headers: headers })
      .then((response) => response.json())
  },

  createNote: function(note) {
    return fetch(`${apiRoot}/note`, { method: 'POST', headers: headers, body: JSON.stringify(note) });
  },

  updateNote: function(note) {
    return fetch(`${apiRoot}/note/${note._id}`, { method: 'PUT', headers: headers, body: JSON.stringify(note) });
  },

  deleteNote: function(noteId) {
    return fetch(`${apiRoot}/note/${noteId}`, { method: 'DELETE', headers: headers });
  },

};
