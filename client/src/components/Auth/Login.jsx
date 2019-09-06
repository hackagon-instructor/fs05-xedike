import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import Text from "../Form/Text";
import Select from "../Form/Select";
import { Button, Form, Container } from 'reactstrap';
import axios from 'axios';
import { login } from '../../actions/auth';

const formConfig = [
  { name: "email", type: "text", value: "" },
  { name: "password", type: "password", value: "" },
]

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      errors: {}
    }
  }

  getFieldValue = (field) => {
    console.log("TCL: Register -> getFieldValue -> field", field)
    const newState = { ...this.state, ...field }
    this.setState(newState)
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password }
    this.props.login(data);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      errors: nextProps.errors
    })
  }

  renderForm = () => {
    const { errors } = this.state;
    return formConfig.map((item, index) => {
      switch (item.type) {
        case "select":
          return <Select
            key={index}
            item={item}
            value={this.state[`${item.name}`]}
            error={errors[`${item.name}`]}
            getFieldValue={this.getFieldValue}
          />

        default:
          return <Text
            key={index}
            item={item}
            value={this.state[`${item.name}`]}
            error={errors[`${item.name}`]}
            getFieldValue={this.getFieldValue}
          />
      }
    })
  }

  render() {
    return (
      <Container className="text-left">
        <h1>LOGIN</h1>
        <Form onSubmit={this.onSubmit}>
          {this.renderForm()}

          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps, { login })(Login);