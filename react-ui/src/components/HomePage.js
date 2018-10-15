import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <Card className="container">
          {Auth.isUserAuthenticated() ? (
            <CardContent>
              <Typography>
                Welcome! You are logged in.
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <Typography>
                Welcome to the Plant Api, please make an account or login.
              </Typography>
            </CardContent>
          )}
      </Card>
    )
  }
};

export default HomePage;
