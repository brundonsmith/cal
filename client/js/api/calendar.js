
var headers = require('utilities').headers;

module.exports = {

  getAllCalendars: function() {
    return fetch(`${apiRoot}/api/calendar/all`, { method: 'GET', headers: headers() })
  },

  getCalendar: function(calendarId) {
    return fetch(`${apiRoot}/api/calendar/${calendarId}`, { method: 'GET', headers: headers() })
  },

  createCalendar: function(calendar) {
    return fetch(`${apiRoot}/api/calendar`, { method: 'POST', headers: headers(), body: JSON.stringify(calendar) });
  },

  deleteCalendar: function(calendarId) {
    return fetch(`${apiRoot}/api/calendar/${calendarId}`, { method: 'DELETE', headers: headers() });
  },

};
