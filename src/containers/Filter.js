import React, {Component} from 'react'
import { Button, Container, Progress, Badge, Row, Col, Input, InputGroup,InputGroupButton, Form, FormGroup,
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,  } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import filterStyle from '../styles/filter.scss'

import Popover from '../components/StaticPopover.js'
import Section from '../components/Section.js'

var getTop = ( el ) => {
  var top = 0;
  while( el && !isNaN( el.offsetTop ) ) {
    top += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return top;
}

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      isOpen: false
    }
    this.onFilterInputChange = this.onFilterInputChange.bind(this)
    this.fireFilterChange = this.fireFilterChange.bind(this)
    this.onClearClicked = this.onClearClicked.bind(this)
    this.toggle = this.toggle.bind(this)
    this.linkClicked = this.linkClicked.bind(this)
    this.timeoutId = 0
  }
  onFilterInputChange(event) {
    this.setState({
      filter: event.target.value,
      isOpen: false
    })
    this.fireFilterChangeDelayed(200)
  }
  fireFilterChange() {
    this.props.onFilterChange(this.state.filter)
  }
  fireFilterChangeDelayed(delay, scrollId = false) {
    if (this.timeoutId > 0) clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(this.fireFilterChange, delay)
    if (scrollId) {
        setTimeout(() => {document.getElementById(scrollId).scrollIntoView()}, 50)
    }
  }
  onKeyPress(event) {
    if (event.key == "Enter") event.preventDefault()
  }
  onClearClicked(event) {
    event.preventDefault()
    this.setState({
      filter: ''
    })
    window.scrollTo(0, 0)
    this.fireFilterChangeDelayed(0)
  }
  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }
  linkClicked(event) {
    const state = {
      isOpen: false
    }
    const id = event.target.href.split('#')[1]
    if (id != 'projects') {
      state.filter = ''
    }
    this.setState(state)
    if (id != 'projects') {
      this.fireFilterChangeDelayed(0, id)
    }
  }
  render() {
    return <div>
        <Navbar color="faded" light toggleable="sm" fixed="top">
          <Container>
            <NavbarToggler right onClick={this.toggle} />

            <Form inline>
              <InputGroup>
                <Input placeholder="Filter..." value={this.state.filter} onChange={this.onFilterInputChange} onKeyPress={this.onKeyPress} autoFocus/>
                <InputGroupButton><Button onClick={this.onClearClicked}><FontAwesome name="trash"/></Button></InputGroupButton>
              </InputGroup>
            </Form>

            <Collapse isOpen={this.state.isOpen} left navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="#about" onClick={this.linkClicked}>About&nbsp;Me</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#education" onClick={this.linkClicked}>Education</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#experience" onClick={this.linkClicked}>Experience</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#projects" onClick={this.linkClicked}>Projects</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
  }
}

export default Filter
