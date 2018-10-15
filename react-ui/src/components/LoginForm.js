import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, TextField} from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  classes
}) => (
  <Card>
    <CardContent>
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}

         <TextField
          name="email"
          label="Email"
          value={user.email}
          autoComplete="email"
          className={classes.textField}
          onChange={(e) => onChange(e)}
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          className={classes.textField}
          onChange={(e) => onChange(e)}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <div>
          <Button  type="submit"  color="primary">
            Log In
          </Button>
        </div> 
        <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
      </form>
    </CardContent>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
