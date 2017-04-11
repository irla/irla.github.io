import React, {Component} from 'react'
import { Button, Container, Progress, Badge, Row, Col, Input, Form, FormGroup } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

import Popover from '../components/StaticPopover.js'
import Section from '../components/Section.js'


class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: ''
    }
    this.onFilterInputChange = this.onFilterInputChange.bind(this)
    this.fireFilterChange = this.fireFilterChange.bind(this)
    this.onClearClicked = this.onClearClicked.bind(this)
    this.timeoutId = 0
  }
  onFilterInputChange(event) {
    this.setState({
      filter: event.target.value
    })
    this.fireFilterChangeDelayed(300)
  }
  fireFilterChange() {
    this.props.onFilterChange(this.state.filter)
  }
  fireFilterChangeDelayed(delay) {
    if (this.timeoutId > 0) clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(this.fireFilterChange, delay)
  }
  onKeyPress(event) {
    if (event.key == "Enter") event.preventDefault()
  }
  onClearClicked(event) {
    this.setState({
      filter: ''
    })
    this.fireFilterChangeDelayed(150)
    event.preventDefault()
  }
  render() {
    return <Form inline>
      <FormGroup>
        <Input placeholder="Filter..." value={this.state.filter} onChange={this.onFilterInputChange} onKeyPress={this.onKeyPress} autoFocus/>
        <Button onClick={this.onClearClicked}>Clear</Button>
      </FormGroup>
    </Form>
  }
}

export default Filter
