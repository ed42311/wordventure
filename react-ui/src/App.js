import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { blue, indigo, red }from '@material-ui/core/colors';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

 // import {
 //   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Link
 // } from 'react-router-dom'

// import HomePage from './components/HomePage.js';
// import LoginPage from './containers/LoginPage.js';
// import LogoutFunction from './containers/LogoutFunction.js';
// import SignUpPage from './containers/SignUpPage.js';
// import DashboardPage from './containers/DashBoardPage.js';
// import WorldPage from './containers/WorldPage.js'
import AdventurePage from './containers/AdventurePage.js'

import Auth from './modules/Auth';
// import { keyHandler } from './modules/Handlers';

import './App.css'

injectTapEventPlugin();

const custTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
});

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     Auth.isUserAuthenticated() ? (
//       <Component {...props} {...rest} />
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )
//
// const LoggedOutRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     Auth.isUserAuthenticated() ? (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     ) : (
//       <Component {...props} {...rest} />
//     )
//   )}/>
// )
//
// const PropsRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     <Component {...props} {...rest} />
//   )}/>
// )

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      trigger: '',
      world: {},
      area: {}
    }
  };

  componentDidMount = async () => {
    await this.toggleAuthenticateStatus()
    await fetch('/api/world/entrance/5bc3d8d69b97dfdd3e5e2390')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // if(data.success){
        //   const { message, world, area } = data
        //   this.setState({
        //     errors: {},
        //     world,
        //     area,
        //     message
        //   });
        // } else {
        //   const { message, errors } = data
        //   this.setState({
        //     errors,
        //     message
        //   });
        // }
      })
  }

  toggleAuthenticateStatus() {
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  updateTrigger = (e) => {
    e.preventDefault()
    const trigger = e.target.value
    this.setState({trigger})
  }

  handleKeyPress = (e) => {
      if(e.key === "Enter") {

      }
  }

  render() {
    const { world } = this.state
    return (
      <MuiThemeProvider theme={custTheme}>
        <div onKeyPress={this.handleKeyPress}>
          <h3>Hello World</h3>
          <AdventurePage {...this.state} />
          <input
            className="control-box"
            style={{ border: "2px solid black" }}
            type="text"
            onChange={this.updateTrigger}
          />
          <p>{this.state.trigger}</p>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
