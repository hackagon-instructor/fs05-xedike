import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/auth';
import {
  Button, Form, FormGroup, Label,
  Input, FormText, Container, FormFeedback,
  option
} from 'reactstrap';
import _ from "lodash";
import Text from "../Form/Text";
import Select from "../Form/Select";

const formConfig = [
  { name: "email", type: "text", value: "" },
  { name: "password", type: "password", value: "" },
  { name: "userType", type: "select", options: ["driver", "passenger"] }
]


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      DOB: "",
      phone: "",
      userType: "",

      errors: {}
    }
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
          />

        default:
          return <Text
            key={index}
            item={item}
            value={this.state[`${item.name}`]}
            error={errors[`${item.name}`]}
          />
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.state
    this.props.createUser(data);
  }

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEmpty(nextProps.errors)) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { errors } = this.state;
    return (
      <Container className="text-left">
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

export default connect(mapStateToProps, { createUser })(Register);