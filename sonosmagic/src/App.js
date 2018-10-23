import React from 'react';
import {Component} from 'react';
import './app.css';
import './common.css';
import logo from './sonos-family-logo.png'
import {createAuthorize} from './sonosAuthorize.js';
/* import { BrowserRouter as Router, Route, Link } from "react-router-dom"; */

class App extends Component {
  render() {
    return (
      <div className="App">
        <ControlSelectView/>
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
      <div className="bg-black section spacing-height-full spacing-width-full vert-align-parent"> 
        <div className="row vert-align-child">
          <div className="columns small-12 small-centered text-center">
            <div className="row">
            <div className="large-icon">
              <span className="icon-home-music white"></span>
            </div>
            </div>
            <div className="row vert-padding-6vw">
               <ActionButton name="Connect" onClick={(e) => window.alert("alert fired", e)}/> 
            </div>
            <div className="row">
              <ActionButton name="Monitor" onClick={(e) => window.alert("alert fired", e)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class GroupButton extends Component {
  constructor(props) {
    super(props);
    this.state = {text: props.text}
  }
  render() {
    return (
    <a href="#" className="button large small-9" href="#" onClick={this.handleClick}>
        {this.state.text}
    </a>
    );
  }
}

class GroupsSelectView extends View {
  constructor(props) {
    super(props);
    // get available speakers
    // update state of the monitor object 
    // on click handler for each tile here
    this.state = {groups: ["Living Room", "Study", "Kitchen", "Bedroom"]};
  }
   
  render() {
    var buttons = this.state.groups.map(function(name) {
                    return <div className="row spacing-pa-l">
                              <GroupButton text={name}/>
                            </div>;
                  });
    return(
      <div className="bg-gray-light spacing-height-full spacing-width-full vert-align-parent">
        <div className="row vert-align-child">
          <div className="columns small-12 small-center text-center">
          <h2 className="title">
            Where do you want to monitor?
          </h2>
          <div className="large-icon">
            <span className="icon-mic"></span>
          </div>
           {buttons}
          </div>
        </div>
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
