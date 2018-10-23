import React from 'react';
import {Component} from 'react';
import './app.css';
import './common.css';
import logo from './sonos-family-logo.png'
import {createAuthorize} from './sonosAuthorize.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <WelcomeView/>
      </div>
    );
  }
}

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {text: props.name};
    this.handleClick = props.onClick;
  }
  render() {
    return (
      <a className="button white large small-6" href="#" onClick={this.handleClick}>
         {this.state.text} 
      </a>
    );
  }
}

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {Monitor: props.Monitor};
  }
}

class WelcomeView extends View {
  fireAlert() {
    window.alert("fired alert.");
  }
  render() {
    return (
      <div className="bg-black section spacing-height-full spacing-width-full vert-align-parent">
        <div className="row vert-align-child">
          <div className="columns small-12 small-centered text-center">
            <div className="section-header">
              <h2 className="white"> SONOS </h2>
              <h2 className="white"> + </h2>
              <h2 className="white"> FAMILY </h2>
            </div>
            <div className="row">
              <div className="columns">
                <img src={logo} className="vert-padding-6vw small-3" alt="?"/>
              </div>
            </div>
            <div className="row">
              <ActionButton name="LOGIN" onClick={(e) => this.fireAlert(e)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ControlSelectView extends View {
  render() {
    return (
      <div>
      <div className="row">
        <ActionButton name="NextPage" onClick={this.state.viewControl('GroupsSelectView')}/>
      </div>
      </div>
    )
  }
}

class GroupsSelectView extends View {
  render() {
    return(
      <div>
        this is view groups
      </div>
    );
  }
}

class MonitorView extends View {
  render() {
    return(
      <div>
        this is Monitor
      </div>
    )
  }
}

export default App;
