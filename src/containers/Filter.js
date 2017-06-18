// @flow
import React, { Component } from 'react';
import { Button, Container, Input, InputGroup, InputGroupButton, Form, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import '../styles/filter.scss';

class Filter extends Component {
  timeoutId: number;
  props: {
    onFilterChange: (filter: string) => void
  };
  state: {
    filter: string,
    isOpen: boolean
  };
  static onKeyPress(event: SyntheticEvent) {
    if (event.key === 'Enter') event.preventDefault();
  }
  constructor() {
    super();
    this.state = {
      filter: '',
      isOpen: false
    };
    this.timeoutId = 0;
  }
  onFilterInputChange(event: SyntheticEvent & { target: HTMLInputElement}) {
    this.setState({
      filter: event.target.value,
      isOpen: false
    });
    this.fireFilterChangeDelayed(200);
  }
  fireFilterChange() {
    this.props.onFilterChange(this.state.filter);
  }
  fireFilterChangeDelayed(delay: number, scrollId : string = '') {
    if (this.timeoutId > 0) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.fireFilterChange.bind(this), delay);
    if (scrollId) {
      setTimeout(() => {
        const element = document.getElementById(scrollId);
        if (element) element.scrollIntoView();
      }, 50);
    }
  }
  onClearClicked(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({
      filter: ''
    });
    window.scrollTo(0, 0);
    this.fireFilterChangeDelayed(0);
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  linkClicked(event: SyntheticEvent & { target: HTMLAnchorElement }) {
    const state = {
      isOpen: false,
      filter: this.state.filter
    };
    const id = event.target.href.split('#')[1];
    if (id !== 'projects') {
      state.filter = '';
    }
    this.setState(state);
    if (id !== 'projects') {
      this.fireFilterChangeDelayed(0, id);
    }
  }
  render() {
    return (<div className="hidden-print">
      <Navbar color="faded" light toggleable="sm" fixed="top">
        <Container>
          <NavbarToggler right onClick={this.toggle.bind(this)} />

          <Form inline>
            <InputGroup>
              <Input
                placeholder="Filter..."
                value={this.state.filter}
                onChange={this.onFilterInputChange.bind(this)}
                onKeyPress={Filter.onKeyPress}
                autoFocus
              />
              <InputGroupButton><Button onClick={this.onClearClicked.bind(this)}><FontAwesome name="trash" /></Button></InputGroupButton>
            </InputGroup>
          </Form>

          <Collapse isOpen={this.state.isOpen} left navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#about" onClick={this.linkClicked.bind(this)}>About&nbsp;Me</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#education" onClick={this.linkClicked.bind(this)}>Education</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#experience" onClick={this.linkClicked.bind(this)}>Experience</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#projects" onClick={this.linkClicked.bind(this)}>Projects</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>);
  }
}

export default Filter;
