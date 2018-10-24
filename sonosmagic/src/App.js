import React from 'react';
import {Component} from 'react';
import './app.css';
import './common.css';
import logo from './sonos-family-logo.png'
import { BrowserRouter as Router, Route } from "react-router-dom";
import {createAuthorize} from './sonosAuthorize';
import {getGroups, getConnectData} from './testHouse';

// Various button styles 
const actionButton = "button large white small-6";
const selectButton = "button large small-9";
const viewerButton = "button transparent small-7 disp-inline-block";
const startButton = "btn large small-3 disp-inline-block";
const stopButton = "btn large btn-search small-3 disp-inline-block";
const homeButton = "btn large small-3 disp-inline-block";

class App extends Component {
  // initilize controller state
  constructor(props) {
    super(props);
    this.state = {
      house: {
        groups: getGroups,
        allReminders: getConnectData
      },
      connect: {
        reminderType: null,
        reminderText: null,
        destination: null
      },

      monitor: {
        listener: null,
        source: null
      }
    };
    this.getListenerOptions = this.getListenerOptions.bind(this);
    this.getSourceOptions = this.getSourceOptions.bind(this);
    this.setListener = this.setListener.bind(this);
    this.setSource = this.setSource.bind(this);
    this.setReminderType = this.setReminderType.bind(this);
    this.setReminderText = this.setReminderText.bind(this);
    this.setReminderDest = this.setReminderDest.bind(this);
  }
  // accessor and mutator methods for component calls
  getListenerOptions() {
    var copy = this.state.house.groups.slice(0);
    return copy.remove(this.state.monitor.source);
  }
  getSourceOptions() {
    var copy = this.state.house.groups.slice(0);
    return copy.remove(this.state.monitor.listener);
  }
  setListener(choice) {
    this.setState = {monitor: {listener: choice}};
  }
  setSource(choice) {
    this.setState = {monitor: {source: choice}};
  }
  setReminderType(type) {
    this.setState = {connect: {reminderType: type}};
  }
  setReminderText(text) {
    this.setState = {connect: {reminderText: text}};
  }
  setReminderDest(choice) {
    this.setState = {connect: {destination: choice}};
  }
  render() {
    // Icon styles for different views
    var mic = <Icon outerClass="large-icon" innerClass="icon-mic"/>;
    var vol = <Icon outerClass="large-icon" innerClass="icon-volume"/>;
    var mic2 = <Icon outerClass="large-icon disp-inline-block" innerClass="icon-mic"/>;
    var vol2 = <Icon outerClass="large-icon disp-inline-block" innerClass="icon-volume"/>;
    var home = <Icon outerClass="large-icon" innerClass="icon-home-music white"/>;
    var start = <Icon outerClass="small-icon disp-inline-block teal" innerClass="icon-ok"/>;
    var stop = <Icon outerClass="large-icon disp-inline-block satusma" innerClass="icon-cancel-circled"/>;
    var home2 = <Icon outerClass="large-icon" innerClass="icon-home-music"/>;
    const groups = this.state.house.groups;
    return (
      <div className="App">
        { 
          // Routes between different views. 
          <Router>
            <div className="spacing-height-full">
              <Route
                exact path="/"
                render={props => <WelcomeView {...props} routes={[createAuthorize("http://localhost:3000/SelectControl")]}/>} // use createAuthorize function to perform psuedo-OAuth login
              />
              <Route
                path="/SelectControl"
                render={props => <ControlSelectView {...props} icon={home} routes={['/SelectControl', '/SelectMonitor']}/>}
              />
              {/*Select connect routes*/}
              

              {/*Select monitor routes*/}
              <Route
                path="/SelectMonitor"
                render={props => <GroupsSelectView {...props} question={"Where are you?"} icon={vol} groups={groups} monitor={this.state.monitor.listener} routes={['/SelectSource', '/SelectMonitor', '/SelectMonitor', '/SelectMonitor']}/>}
              />
              <Route
                path="/SelectSource"
                render={props => <GroupsSelectView {...props} question={"Where do you want to monitor?"} icon={mic} groups={this.state.house.groups} routes={['/SelectSource', "/Monitor", '/SelectSource', '/#']}/>}
              />
              <Route
                path="/Monitor"
                render={props => <MonitorView {...props} monitor={'Living Room'} monitorIcon={vol2} source={"Study"} sourceIcon={mic2} startIcon={start} stopIcon={stop} homeIcon={home2} routes={['/SelectMonitor', "/SelectSource", '/Monitor', '/Monitor', '/SelectControl']}/>}
              />
            </div>
          </Router>  
        }
      </div>
    );
  }
}

// Generic Component for creating Icons
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

// Generic Component for creating Buttons
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {text: props.text,
                  className: props.className,
                  routePath: props.routePath};
  }
  render() {
    return (
      <a className={this.state.className} href={this.state.routePath}>
        {this.state.text} 
      </a>
    );
  }
}

// Super class of most views, tracks state of the user's controller during interaction.
class View extends Component {
  constructor(props) {
    super(props)
    this.state = {monitor: props.monitor, 
                  routes: props.routes};
  }
}

// Main view before logging in.
class WelcomeView extends View {
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
              <Button text="LOGIN" className={actionButton} routePath={this.props.routes[0]}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// View for selecting the control system/function (Connect or Monitor)
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
               <Button text="Connect" className={actionButton} routePath={this.props.routes[0]}/> 
            </div>
            <div className="row">
              <Button text="Monitor" className={actionButton} routePath={this.props.routes[1]}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Generic view which has a title, icon and a group of options in button format.
class GroupsSelectView extends View {
  constructor(props) {
    super(props);
    this.state = {groups: props.groups,
                  question: props.question,
                  icon: props.icon,
                  routes: props.routes};
  }
   
  render() {
    var buttons = [];
    for (var i = 0; i < this.state.groups.length; i++) {
      buttons.push(<div className="row spacing-pa-l">
                      <Button text={this.state.groups[i]} className={selectButton} routePath={this.state.routes[i]}/>
                   </div>);
    }
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

// Generic view for monitoring the system when controller settings have been selected.
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
            <div className="columns small-12 spacing-mv-xxl">
              {this.state.monitorIcon}
              <Button text={this.state.monitor} className={viewerButton} routePath={this.props.routes[0]}/> 
            </div>
            <div className="columns small-12 spacing-mv-xxl">
              {this.state.sourceIcon}
              <Button text={this.state.source} className={viewerButton} routePath={this.props.routes[1]}/>
            </div>
            <div className="row small-12 spacing-mv-xxl">
                <Button text={this.state.startIcon} className={startButton} onClick={() => alert("Now monitoring " + this.state.source + " from " + this.state.monitor)} routePath={this.props.routes[2]}/>
                <Button text={this.state.stopIcon} className={stopButton} onClick={() => alert("Monitoring stopped.")} routePath={this.props.routes[3]}/>
                <Button text={this.state.homeIcon} className={homeButton} routePath={this.props.routes[4]}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;