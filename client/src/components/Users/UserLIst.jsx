import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUsers } from '../../actions/users';

class UserLIst extends Component {

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        <h1>USER LIST</h1>
      </div>
    );
  }
}

export default connect(null, { getUsers })(UserLIst);