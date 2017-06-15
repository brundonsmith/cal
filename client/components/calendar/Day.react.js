
import React from 'react';

class Day extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={`component-day ${this.props.outOfFocus ? 'out-of-focus' : ''} ${this.props.expanded ? 'expanded' : ''}`} onClick={this.handleClick.bind(this)}>
        <div className="number">{this.props.date.getDate()}</div>
        <div className="events">
          {this.props.children}
        </div>
      </div>
    );
	}

  handleClick() {
    if(this.props.onTileClick && !this.props.expanded) {
      this.props.onTileClick();
    }
  }

}

export default Day;
