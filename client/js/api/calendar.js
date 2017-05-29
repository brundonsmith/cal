
var apiRoot = 'http://localhost:8080';//'https://shielded-wave-87292.herokuapp.com';

var headers = {
  'Content-Type': 'application/json',
  'Authorization': 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0cmlwZXMiLCJzYWx0IjoiMTk0NDQxNTcxMzIyMjE1Njg5MjIwMjgyMTE1NTIwNzk1MjA3MjM4MTcyIn0.GSx36LDSBpjr6gfB-rEkzAMefy6sZxFAXDjgiYuefBs',
};

module.exports = {

  getAllCalendars: function() {
    return fetch(`${apiRoot}/calendar/all`, { method: 'GET', headers: headers })
      .then((response) => response.json())
  },

  getCalendar: function(calendarId) {
    return fetch(`${apiRoot}/calendar/${calendarId}`, { method: 'GET', headers: headers })
      .then((response) => response.json())
  },

  createCalendar: function(calendar) {
    return fetch(`${apiRoot}/calendar`, { method: 'POST', headers: headers, body: JSON.stringify(calendar) });
  },

  deleteCalendar: function(calendarId) {
    return fetch(`${apiRoot}/calendar/${calendarId}`, { method: 'DELETE', headers: headers });
  },

};
