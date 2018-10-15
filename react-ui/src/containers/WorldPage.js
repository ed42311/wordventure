import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import WorldForm from '../components/SignUpForm.js';

export default class WorldPage extends Component {
  constructor(props, context) {
    super(props, context);
    console.log("context, ", context)
    this.state = {
      message: "",
      errors: {},
      world: {
        title: '',
        body: '',
        areas: ''
      },
      worlds : [],
      classes: {}
    };
  }

  /**
   * Process the form.
   *
   * @param {object} event
   */
  processForm(event) {
    event.preventDefault();
    const { world } = this.state
    fetch('/api/worlds', {
        method: 'POST',
        headers :  {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(world),
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
  changeWorld(event) {
    const { name, value } = event.target;
    const { world } = this.state;
    world[name] = value;

    this.setState({
      world
    });
  }

  componentDidMount () {
    fetch('/api/worlds')
      .then(res => res.json())
      .then(data => {
        if(data.success){
          const { message, worlds } = data
          this.setState({
            errors: {},
            worlds,
            message
          });
        } else {
          const { message, errors } = data
          this.setState({
            errors,
            message
          });
        }
      })
  }

  render() {
    return (
      <div>
        <p>Worlds</p>
        {this.state.worlds.map(world =>
          <div>
            <h4>{world.title}</h4>
            <p>{world.body}</p>
          </div>
        )}
      </div>
    );
  }

}

// WorldPage.contextTypes = {
//   router: PropTypes.object.isRequired
// };
