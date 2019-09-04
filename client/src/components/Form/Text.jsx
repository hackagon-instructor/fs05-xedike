import React, { Component } from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.item.name]: props.item.value
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { item, value, error } = this.props;
    return (
      <FormGroup >
        <Label for="email" className="text-capitalize" >{item.name}</Label>
        <Input
          type={item.type}
          name={item.name}
          id={item.name}
          onChange={this.onChange}
          value={this.state[`${item.name}`]}
          invalid={error ? true : false}
        />
        <FormFeedback>{error}</FormFeedback>
      </FormGroup>
    );
  }
}

export default Text;