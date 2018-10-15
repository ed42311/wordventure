import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { blue, indigo, red }from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import HomePage from './components/HomePage.js';
import LoginPage from './containers/LoginPage.js';
import LogoutFunction from './containers/LogoutFunction.js';
import SignUpPage from './containers/SignUpPage.js';
import DashboardPage from './containers/DashBoardPage.js';
import Auth from './modules/Auth';

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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    return (
      <MuiThemeProvider theme={custTheme}>
        <Router>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit" >
                  Plants App
                </Typography>
                {this.state.authenticated ? (
                      <div className="top-bar-right">
                        <Button component={Link} color="inherit" to="/dashboard">
                          Dashboard
                        </Button>
                        <Button component={Link} color="inherit" to="/logout">
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <div className="top-bar-right">
                        <Button component={Link} color="inherit" to="/login">
                          Log in
                          </Button>
                        <Button component={Link} to="/signup" color="inherit" > 
                          Sign Up 
                        </Button>
                      </div>
                    )}
              </Toolbar>
            </AppBar>
            <div>
              <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
              <PrivateRoute path="/dashboard" component={DashboardPage}/>
              <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
              <LoggedOutRoute path="/signup" component={SignUpPage}/>
              <Route path="/logout" component={LogoutFunction}/>
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
