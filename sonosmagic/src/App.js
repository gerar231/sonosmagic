import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createAuthorize } from './sonosAuthorize';

class App extends Component {
  renderButton() {
    return <LoginButton/>;
  }
  render() {
    return (
      <div className="App">
        <LoginButton/>  
      </div>
    );
  }
}

class LoginButton extends Component {
  handleClick = () => {
    // call sonos authorization here
    // if authorization successful return some information
    // to the console and send a window alert that says success.
    createAuthorize();
  }
  render() {
    return (
      <button onClick={this.handleClick}>
          Login to SONOS
      </button>
    );
  }
}

export default App;
