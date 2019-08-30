import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/auth';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      DOB: "",
      phone: "",
      userType: ""
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.state
    this.props.createUser(data);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderField = () => {
    return config.map()
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email"
              name="email" id="email"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password"
              name="password" id="password"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password2">Confirm password</Label>
            <Input type="password2"
              name="password2" id="password2"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userType">Select</Label>
            <Input type="select" name="userType" id="userType"
              onChange={this.onChange}
              value={this.state.value}
            >
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="DOB">DOB</Label>
            <Input type="date"
              name="DOB" id="DOB"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="text"
              name="phone" id="phone"
              onChange={this.onChange}
              value={this.state.value}
            />
          </FormGroup>

          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { createUser })(Register);