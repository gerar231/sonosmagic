import React from 'react';
import {Component} from 'react';
import './app.css';
import './common.css';
import logo from './sonos-family-logo.png'
import {createAuthorize} from './sonosAuthorize.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const actionButton = "button large white small-6";
const selectButton = "button large small-9";
const viewerButton = "button transparent small-7 disp-inline-block";
const startButton = "btn large small-3 disp-inline-block";
const stopButton = "btn large btn-search small-3 disp-inline-block";
const homeButton = "btn large small-3 disp-inline-block";

class App extends Component {
  render() {
    var mic = <Icon outerClass="large-icon" innerClass="icon-mic"/>;
    var vol = <Icon outerClass="large-icon" innerClass="icon-volume"/>;
    var mic2 = <Icon outerClass="large-icon disp-inline-block" innerClass="icon-mic"/>;
    var vol2 = <Icon outerClass="large-icon disp-inline-block" innerClass="icon-volume"/>;
    var home = <Icon outerClass="large-icon" innerClass="icon-home-music white"/>;
    var start = <Icon outerClass="small-icon disp-inline-block teal" innerClass="icon-ok"/>;
    var stop = <Icon outerClass="large-icon disp-inline-block satusma" innerClass="icon-cancel-circled"/>;
    var home2 = <Icon outerClass="large-icon" innerClass="icon-home-music"/>;
    return (
      <div className="App">
        {  
           <Router>
             <div className="spacing-height-full">
               <Route
                  exact path="/"
                  render={props => <WelcomeView {...props} routes={['/SelectControl']}/>}
                />
               <Route
                  path="/SelectControl"
                  render={props => <ControlSelectView {...props} icon={home} routes={['/SelectControl', '/SelectMonitor']}/>}
                />
               <Route
                  path="/SelectMonitor"
                  render={props => <GroupsSelectView {...props} questions={"Where are you?"} icon={vol} groups={['Living Room', 'Kitchen', 'Study', 'Lounge']} routes={['/SelectSource', '/SelectMonitor', '/SelectMonitor', '/SelectMonitor']}/>}
                />
               <Route
                  path="/SelectSource"
                  render={props => <GroupsSelectView {...props} question={"Where do you want to monitor?"} icon={mic} groups={['Kitchen', 'Study', 'Lounge']} routes={['/SelectSource', "/Monitor", '/SelectSource']}/>}
                />
               <Route
                  path="/Monitor"
                  render={props => <MonitorView {...props} monitor={'Living Room'} monitorIcon={mic2} source={"Study"} sourceIcon={vol2} startIcon={start} stopIcon={stop} homeIcon={home2} routes={['/SelectMonitor', "/SelectSource", '/Monitor', '/Monitor', '/SelectControl']}/>}
                />
             </div>
           </Router>  
           /* <ControlSelectView icon={home}/> 
            <GroupsSelectView question={"Where are you?"} icon={vol} groups={['Living Room', 'Kitchen', 'Study', 'Lounge']}/>
            <GroupsSelectView question={"Where do you want to monitor?"} icon={mic} groups={['Kitchen', 'Study', 'Lounge']}/> 
             <MonitorView monitor={"Living Room"} monitorIcon={mic2} source={"Study"} sourceIcon={vol2} startIcon={start} stopIcon={stop} homeIcon={home2}/> */
        }
      </div>
    );
  }
}

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

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {monitor: props.monitor, 
                  routes: props.routes};
  }
}

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
  startClick() {
    window.alert("Now monitoring " + this.state.source + " from " + this.state.monitor);
  }
  stopClick() {
    window.alert("Monitoring stopped.");
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
                <Button text={this.state.startIcon} className={startButton} onClick={(e) => {this.startClick(e)}} routePath={this.props.routes[2]}/>
                <Button text={this.state.stopIcon} className={stopButton} onClick={(e) => {this.stopClick.bind(e)}} routePath={this.props.routes[3]}/>
                <Button text={this.state.homeIcon} className={homeButton} routePath={this.props.routes[4]}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;