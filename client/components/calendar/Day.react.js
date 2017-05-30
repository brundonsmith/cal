
import React from 'react';

class Day extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={`component-day ${this.props.outOfFocus ? 'out-of-focus' : ''}`}>
        <div className="number">{this.props.date.getDate()}</div>
        <div className="events">
          {this.props.children}
        </div>
      </div>
    );
	}

}

export default Day;
