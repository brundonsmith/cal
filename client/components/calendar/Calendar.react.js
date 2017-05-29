
import React from 'react';

import Month from './Month';

const Calendar = React.createClass({

  getInitialState: function() {
    return {
      calendars: [ ],
    };
	},

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div className="component-calendar">
        {this.props.mode == 'month' ?
        	<Month calendars={this.state.calendars} date={new Date()} />
         : null}

      </div>
    );
	},

})
export default Calendar;
