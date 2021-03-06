
import React from 'react';
import marked from 'marked';

class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searching: false,
    }
	}

  render() {
    return (
      <div className={`component-nav ${this.state.searching ? 'searching' : ''}`}>

        <i className="menu-button material-icons" onClick={this.props.onMenuButtonClick}>
          menu
        </i>

        <div className="title">
          {this.props.title}
        </div>

        <div className="search">
          <input
            ref={(el) => this.searchInput = el}
            onChange={(e) => this.props.onSearchChange(e.target.value)}
            onBlur={(e) => this.setState({ searching: false })} />
        </div>

        <i className="search-button material-icons" onClick={() => {
            this.setState({ searching: !this.state.searching })
            this.searchInput.focus();
          }}>
          search
        </i>

      </div>
    );
	}

}

export default Nav;
