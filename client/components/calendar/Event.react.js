
import React from 'react';

const Event = React.createClass({

  getInitialState: function() {
    return {
    };
	},

  render: function() {
    return (
      <div className="component-event">
        <div>{this.props.name}</div>
        <div>{this.props.date}</div>
      </div>
    );
	},

})
export default Event;
