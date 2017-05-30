import React from 'react';
import api from 'api';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
	}

  render() {
    return (
      <div className={`component-login ${this.props.open ? 'open' : ''}`}>

        <div>
          <h1>Login</h1>

          <input type="text" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />

          <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />

          <button onClick={this.handleSubmitButtonClick.bind(this)}>
            Submit
          </button>
        </div>

      </div>
    );
	}

  handleSubmitButtonClick() {
    api.authenticate.login(this.state.username, this.state.password)
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        if(response) {
          this.props.onLoginSuccessful(response.token);
        }
      })
  }

}

export default Login;
