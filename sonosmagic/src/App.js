import React from 'react';
import {Component} from 'react';
import './app.css';
import './common.css';
import logo from './sonos-family-logo.png'
import {createAuthorize} from './sonosAuthorize.js';
/* import { BrowserRouter as Router, Route, Link } from "react-router-dom"; */


const actionButton = "button large white small-6";
const selectButton = "button large small-9";
const viewerButton = "button transparent small-3";
const startButton = "btn btn-reset teal small-6";
const stopButton = "btn large btn-search small-6";

class App extends Component {
  render() {
    var mic = <Icon outerClass="large-icon" innerClass="icon-mic"/>;
    var vol = <Icon outerClass="large-icon" innerClass="icon-volume"/>;
    var home = <Icon outerClass="large-icon" innerClass="icon-home-music white"/>;
    var start = <Icon outerClass="large-icon" innerClass="icon-ok"/>;
    var stop = <Icon outerClass="large-icon" innerClass="icon-minus"/>;
    return (
      <div className="App">
        {  /* <WelcomeView/>  
           <ControlSelectView icon={home}/> 
            <GroupsSelectView question={"Where are you?"} icon={vol} groups={['Living Room', 'Kitchen', 'Study', 'Lounge']}/>
            <GroupsSelectView question={"Where do you want to monitor?"} icon={mic} groups={['Kitchen', 'Study', 'Lounge']}/> */
            <MonitorView monitor={"Living Room"} monitorIcon={mic} source={"Study"} sourceIcon={vol} startIcon={start} stopIcon={stop} homeIcon={home}/>
        }
      </div>
    );
  }
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {text: props.text,
                  className: props.className};
    this.handleClick = props.onClick;
  }
  render() {
    return (
      <a className={this.state.className} href="#" onClick={this.handleClick}>
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
              <h1 className="white"> SONOS </h1>
              <h1 className="white"> + </h1>
              <h1 className="white"> FAMILY </h1>
            </div>
            <div className="row">
              <div className="columns">
                <img src={logo} className="vert-padding-6vw small-3" alt="?"/>
              </div>
            </div>
            <div className="row">
              <Button text="LOGIN" className={actionButton} onClick={(e) => this.fireAlert(e)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ControlSelectView extends View {
  constructor(props) {
    super(props);
    this.state = {icon: props.icon};
  }
  render() {
    return (
      <div className="bg-black section spacing-height-full spacing-width-full vert-align-parent"> 
        <div className="row vert-align-child">
          <div className="columns small-12 small-centered text-center">
            <div className="row">
              {this.state.icon}
            </div>
            <div className="row vert-padding-6vw">
               <Button text="Connect" className={actionButton} onClick={(e) => window.alert("alert fired", e)}/> 
            </div>
            <div className="row">
              <Button text="Monitor" className={actionButton} onClick={(e) => window.alert("alert fired", e)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {outerClass: props.outerClass,
                  innerClass: props.innerClass};
  }
  render() {
    return(
      <div className={this.state.outerClass}>
        <span className={this.state.innerClass}></span>
      </div>
    );
  }
}

class GroupsSelectView extends View {
  constructor(props) {
    super(props);
    // get available speakers
    // update state of the monitor object 
    // on click handler for each tile here
    this.state = {groups: props.groups,
                  question: props.question,
                  icon: props.icon};
  }
   
  render() {
    var buttons = this.state.groups.map(function(name) {
                    return <div className="row spacing-pa-l">
                              <Button text={name} className={selectButton}/>
                            </div>;
                  });
    return(
      <div className="bg-gray-light spacing-height-full spacing-width-full vert-align-parent">
        <div className="row vert-align-child">
          <div className="columns small-12 small-center text-center">
          <h2 className="title">
            {this.state.question}
          </h2>
            {this.state.icon}
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

class MonitorView extends View {
  constructor(props) {
    super(props);
    this.state = {monitor: props.monitor,
                  monitorIcon: props.monitorIcon,
                  source: props.source,
                  sourceIcon: props.sourceIcon,
                  startIcon: props.startIcon,
                  stopIcon: props.stopIcon,
                  homeIcon: props.homeIcon}
  }
  render() {
    return(
      <div className="bg-gray-light spacing-height-full spacing-width-full vert-align-parent">
        <div className="row vert-align-child">
          <div className="columns small-12 small-center text-center">
          <div className="columns small-9 small-centered">
            {this.state.monitorIcon}
            <Button text={this.state.monitor} className={viewerButton}/> 
          </div>
          <div className="columns small-9 small-centered">
            {this.state.sourceIcon}
            <Button text={this.state.source} className={viewerButton}/>
          </div>
          <div className="columns small-9 small-centered">
            <div className="spacing-ma-l"> 
              <Button text={this.state.startIcon} className={startButton}/>
            </div>
            <div className="spacing-ma-l"> 
              <Button text={this.state.stopIcon} className={stopButton}/>
            </div>
            <div className="spacing-ma-l"> 
              <Button text={this.state.homeIcon} className={selectButton}/>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;