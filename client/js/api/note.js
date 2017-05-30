
var apiRoot = '';/*'http://localhost:8080';//*//*'https://shielded-wave-87292.herokuapp.com';//*/

function headers() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${window.localStorage.getItem('jwt_token')}`// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0cmlwZXMiLCJzYWx0IjoiMTk0NDQxNTcxMzIyMjE1Njg5MjIwMjgyMTE1NTIwNzk1MjA3MjM4MTcyIn0.GSx36LDSBpjr6gfB-rEkzAMefy6sZxFAXDjgiYuefBs',
  };
};

module.exports = {

  getAllNotes: function() {
    return fetch(`${apiRoot}/api/note/all`, { method: 'GET', headers: headers() });
  },

  getNote: function(noteId) {
    return fetch(`${apiRoot}/api/note/${noteId}`, { method: 'GET', headers: headers() })
      .then((response) => response.json().catch((err) => {}))
  },

  createNote: function(note) {
    return fetch(`${apiRoot}/api/note`, { method: 'POST', headers: headers(), body: JSON.stringify(note) })
      .then((response) => response.json().catch((err) => {}))
  },

  updateNote: function(note) {
    return fetch(`${apiRoot}/api/note/${note._id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(note) })
      .then((response) => response.json().catch((err) => {}))
  },

  deleteNote: function(noteId) {
    return fetch(`${apiRoot}/api/note/${noteId}`, { method: 'DELETE', headers: headers() })
      .then((response) => response.json().catch((err) => {}))
  },

};
