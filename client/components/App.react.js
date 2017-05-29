
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './calendar/Calendar';
import Notes from './notes/Notes';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    if(window.location.hash) {
      var firstSlash = window.location.hash.indexOf('/');
      var secondSlash = firstSlash + 1 + window.location.hash.substr(firstSlash + 1).indexOf('/');
      secondSlash = secondSlash > -1 ? secondSlash : window.location.hash.length;

      this.setState({
        mode: window.location.hash.substring(firstSlash + 1, secondSlash),
      });
    }

    window.onhashchange = () => {
      if(window.location.hash) {
        var firstSlash = window.location.hash.indexOf('/');
        var secondSlash = firstSlash + 1 + window.location.hash.substr(firstSlash + 1).indexOf('/');
        secondSlash = secondSlash > -1 ? secondSlash : window.location.hash.length;

        this.setState({
          mode: window.location.hash.substring(firstSlash + 1, secondSlash),
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
