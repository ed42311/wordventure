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

const PlantForm = ({
  onSubmit,
  onChange,
  plant,
  classes
}) => (
  <Card>
    <CardContent>
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Add A New Plant</h2>
         <TextField
          name="commonName"
          label="Common Name"
          value={plant.commonName}
          autoComplete="email"
          className={classes.textField}
          onChange={(e) => onChange(e)}
          margin="normal"
        />
        <div>
          <Button  type="submit"  color="primary">
            Create New Plant
          </Button>
        </div> 
      </form>
    </CardContent>
  </Card>
);

PlantForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(PlantForm);
