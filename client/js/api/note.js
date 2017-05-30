
var headers = require('utilities').headers;

module.exports = {

  getAllNotes: function() {
    return fetch(`/api/note/all`, { method: 'GET', headers: headers() });
  },

  getNote: function(noteId) {
    return fetch(`/api/note/${noteId}`, { method: 'GET', headers: headers() })
  },

  createNote: function(note) {
    return fetch(`/api/note`, { method: 'POST', headers: headers(), body: JSON.stringify(note) })
  },

  updateNote: function(note) {
    return fetch(`/api/note/${note._id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(note) })
  },

  deleteNote: function(noteId) {
    return fetch(`/api/note/${noteId}`, { method: 'DELETE', headers: headers() })
  },

};
