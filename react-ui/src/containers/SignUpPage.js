import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm.js';

export default class SignUpPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: "",
      errors: {},
      user: {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      },
      classes: {}
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event
   */
  processForm(event) {
    event.preventDefault();
    const { user } = this.state
    fetch('/auth/signup', {
        method: 'POST',
        headers :  {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user),
      })
      .then(res => res.json())
      .then(data => {
        // add errors to state
        const { message, success } = data
        if(success){
          this.setState({
            errors: {}
          });
          localStorage.setItem('successMessage', message);
          this.props.history.push('/login');
        } else {
          this.setState({
            errors: message
          });
        }
      })
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        classes={this.state.classes}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};
