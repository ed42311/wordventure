import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/DashBoard.js';
import PlantElement from '../components/PlantElement.js';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {},
      plants: []
    };
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
  changePlant(event) {
    const field = event.target.name;
    const { user } = this.state;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  componentDidMount() {
    fetch('/api/plants', {
      headers : {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const { message, plants, user } = data
      this.setState({
        secretData: message,
        plants,
        user
      });
    })
  }

  /**
   * Render the component.
   */
  render() {
    console.log(this.state)
    return (
      <div>
        <Dashboard 
          secretData={this.state.secretData} 
          user={this.state.user}
          onSubmit={this.processForm}
          onChange={this.plantUser}
          classes={this.state.classes}
        />
      <ul>
        {this.state.plants.map(plant => <PlantElement plant={plant}/> )}
      </ul>
    </div>
    );
  }

}

export default DashboardPage;
