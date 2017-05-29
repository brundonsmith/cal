
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './calendar/Calendar';
import Notes from './notes/Notes';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: 'notes'
    };
  }

  componentDidMount() {
    if(window.location.hash) {
      this.setState({
        mode: window.location.hash.substr(1),
      });
    }

    window.onhashchange = function() {
      if(window.location.hash) {
        this.setState({
          mode: window.location.hash.substr(1),
        });
      }
    };
  }

  render() {
    return (
      <div className="component-app">
        {this.state.mode === 'calendar' ?
          <Calendar mode="month" />
        : this.state.mode === 'notes' ?
          <Notes />
        : this.state.mode === 'contacts' ?
          <Contacts />
        : null }
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
