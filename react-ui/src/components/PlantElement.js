import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import PlantForm from '../components/PlantForm.js';

const PlantElement = ({ plant }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary">
        {plant.commonName}
      </Typography>
      <Typography variant="headline" component="h2">
    
      </Typography>
    </CardContent>
  </Card>
);


export default PlantElement;
