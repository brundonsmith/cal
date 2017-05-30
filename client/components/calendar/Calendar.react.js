
import React from 'react';
import ReactDOM from 'react-dom';
import api from 'api';

import Model from 'mutable-model';

import Login from '../helpers/Login';
import Nav from '../helpers/Nav';

import Day from './Day';

//import Month from './Month';

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
    this.loadCalendars();
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
            <Day date={day} outOfFocus={day.getMonth() !== this.model.currentMonth} key={day}>
              {/*this.props.calendar.events
                .filter((event) => {
                  return event.date.getFullYear() === day.getFullYear() &&
                          event.date.getMonth() === day.getMonth() &&
                          event.date.getDate() === day.getDate()
                })
                .map((event) => <Event event={event} />)*/
              }
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
        this.model.calendars = calendars;
      })
  }

}

ReactDOM.render(<Calendar />, document.getElementById('root'));

export default Calendar;
