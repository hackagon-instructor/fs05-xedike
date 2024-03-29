import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/auth';
import { Button, Form, Container } from 'reactstrap';
import _ from "lodash";
import Text from "../Form/Text";
import Select from "../Form/Select";

const formConfig = [
  { name: "email", type: "text", value: "" },
  { name: "password", type: "password", value: "" },
  { name: "userType", type: "select", options: ["driver", "passenger"] },
  { name: "password2", type: "password", value: "" },
  { name: "phone", type: "number", value: "" },
  { name: "DOB", type: "date", value: "" },
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

  getFieldValue = (field) => {
    console.log("TCL: Register -> getFieldValue -> field", field)
    const newState = { ...this.state, ...field }
    this.setState(newState)
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

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.state
    this.props.createUser(data);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      errors: nextProps.errors
    })
  }

  render() {
    return (
      <Container className="text-left">
        <h1>REGISTER</h1>
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