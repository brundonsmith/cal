
import React from 'react';

import Day from './Day';
import Event from './Event';

const Month = React.createClass({

  getInitialState: function() {
    return {
    };
	},

  render: function() {
    var days = [];
    var date = new Date();

    var startDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), 0);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    var endDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth() + 1, 0);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    var dateIterator = new Date(startDate.valueOf());
    while(dateIterator <= endDate) {
      days.push(dateIterator);

      dateIterator = new Date(dateIterator.valueOf());
      dateIterator.setDate(dateIterator.getDate() + 1);
    }

    return (
      <div className="component-month">
        {days.map((day) =>
          <Day date={day} outOfFocus={day.getMonth() !== this.props.date.getMonth()} key={day} >
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
    );
	},

})
export default Month;
