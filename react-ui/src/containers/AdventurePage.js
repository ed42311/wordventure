import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import WorldForm from '../components/SignUpForm.js';

export default class AdventurePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = async () => {
    await console.log(this.props.world)
    // fetch(`/world/entrance/${worldId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     if(data.success){
    //       const { message, worlds } = data
    //       this.setState({
    //         errors: {},
    //         worlds,
    //         message
    //       });
    //     } else {
    //       const { message, errors } = data
    //       this.setState({
    //         errors,
    //         message
    //       });
    //     }
    //   })
  }

  render() {
    return (
      <div>
        <p>Adventure</p>
        {this.props.world.title}
      </div>
    );
  }

}
