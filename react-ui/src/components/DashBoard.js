import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import PlantForm from '../components/PlantForm.js';

const Dashboard = ({ secretData, user, onSubmit, onChange, classes }) => (
  <Card className="container">

    <CardContent style={{ fontSize: '16px', color: 'green' }}>
      Welcome <strong>{user.firstName} {user.lastName}</strong>!
      <br />
      <PlantForm 
        onSubmit
        onChange
        plant
        classes
      /> 
    </CardContent>
  </Card>
);


export default Dashboard;
