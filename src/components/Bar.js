import React, {Component} from 'react'
import { Button, Container, Progress, Badge  } from 'reactstrap'

class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick() {
    this.setState((prev) =>({
      value: prev.value + 10
    }))
  }
  render() {
    return <span><Badge color="success">{this.props.label}</Badge>{' '}</span>
  }
}

export default Bar
