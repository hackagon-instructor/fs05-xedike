import React, { Component } from 'react';
import axios from 'axios'

class UserLIst extends Component {

  componentDidMount() {
    axios.get('http://localhost:8888/api/users')
      .then(users => {
        console.log(users)
      })
  }


  render() {


    return (
      <div>
        <h1>USER LIST</h1>
      </div>
    );
  }
}

export default UserLIst;