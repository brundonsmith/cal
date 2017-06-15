
import React from 'react';

class Event extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
	}

  render() {
    return (
      <div className="component-event">
        <div>{this.props.event.title}</div>
      </div>
    );
	}

}

export default Event;
