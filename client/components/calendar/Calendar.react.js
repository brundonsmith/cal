
import React from 'react';
import ReactDOM from 'react-dom';
import api from 'api';

import Model from 'mutable-model';

import Login from '../helpers/Login';
import Nav from '../helpers/Nav';

import Day from './Day';
import Event from './Event';

//import Month from './Month';

function getAbsoluteDay(date) {
  return (((date.getYear() * 12) + date.getMonth()) * 30) + date.getDate();
}


class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.model = new Model(this, {
      loginOpen: false,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      calendars: [ ],
    });
	}

  componentWillMount() {
    this.setState({ model: this.model })
    this.loadCalendars();

    window.onhashchange = () => this.setState({});
  }

  render() {
    var days = [];
    var today = new Date();

    var startDate = new Date(this.model.currentYear, this.model.currentMonth, 0);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    var endDate = new Date(this.model.currentYear, this.model.currentMonth + 1, 0);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    var dateIterator = new Date(startDate.valueOf());
    while(dateIterator <= endDate) {
      days.push(dateIterator);

      dateIterator = new Date(dateIterator.valueOf());
      dateIterator.setDate(dateIterator.getDate() + 1);
    }

    var events = this.model.calendars
      .reduce((allEvents, calendar) => allEvents.concat(calendar.events.map((ev) => {
        var clone = JSON.parse(JSON.stringify(ev));
        clone.color = calendar.color;
        clone.date = new Date(clone.date);
        return clone;
      })), [])
      .reduce((eventsByDate, ev) => {
        eventsByDate[getAbsoluteDay(ev.date)] = eventsByDate[getAbsoluteDay(ev.date)]
          ? eventsByDate[getAbsoluteDay(ev.date)].concat([ ev ])
          : [ ev ];
        return eventsByDate;
      }, {});

    console.log(events)

    return (
      <div className="component-calendar">
        <Login
          open={this.model.loginOpen}
          onLoginSuccessful={(token) => {
            window.localStorage.setItem('jwt_token', token);
            this.model.loginOpen = false;
            this.loadCalendars();
          }} />

        <Nav
          title="Calendar"
          onMenuButtonClick={() => {
          }}
          searchValue={''}
          onSearchChange={(val) => {
          }} />

        <div className="main-container">
          {days.map((day) =>
            <Day
                date={day}
                outOfFocus={day.getMonth() !== this.model.currentMonth}
                onTileClick={() => window.location.hash = day.valueOf()}
                expanded={parseInt(window.location.hash.substr(1)) === day.valueOf()}
                key={day.valueOf()}>
              {events[getAbsoluteDay(day)]
                ? events[getAbsoluteDay(day)].map((event) =>
                    <div className="event" style={{ backgroundColor: event.color }} key={event._id}>
                      {event.title}
                    </div>)
                : null}
            </Day>)}
        </div>

      </div>
    );
	}

  loadCalendars() {
    return api.calendar.getAllCalendars()
      .then((response) => {
        if(response.status === 401) {
          this.model.loginOpen = true;
          return [];
        } else {
          return response.json();
        }
      })
      .then((calendars) => {
        calendars.forEach((calendar) => {
          calendar.events.forEach((ev) => {
            ev.date = new Date(ev.date);
          })
        });

        return calendars;
      })
      .then((calendars) => {
        this.model.calendars = calendars;
      })
  }

}

ReactDOM.render(<Calendar />, document.getElementById('root'));

export default Calendar;
