import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function PlantAppBar(props) {
  const { classes, authenticated } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Meh
          </Typography>
          {authenticated ? (
                <div className="top-bar-right">
                  <Button color="inherit"to="/dashboard">Dashboard</Button>
                  <Button color="inherit" to="/logout">Log out</Button>
                </div>
              ) : (
                <div className="top-bar-right">
                  <Button color="inherit" to="/login">Log in</Button>
                  <Button color="inherit" to="/signup">Sign up</Button>
                </div>
              )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

PlantAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlantAppBar);