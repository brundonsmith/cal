
import React from 'react';

const Day = React.createClass({

  getInitialState: function() {
    return {
    };
	},

  render: function() {
    return (
      <div className={`component-day ${this.props.outOfFocus ? 'out-of-focus' : ''}`}>
        <div className="number">{this.props.date.getDate()}</div>
        <div className="events">
          {this.props.children}
        </div>
      </div>
    );
	},

})
export default Day;
