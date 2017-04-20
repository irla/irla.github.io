import React, {Component} from 'react'
import { Button, Container, Progress, Badge, Row, Col, Input, Form, FormGroup } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

import Popover from '../components/StaticPopover.js'
import Section from '../components/Section.js'

const calculateAge = (birthday) => {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const years = calculateAge(new Date('1983-10-11'))

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: 'irla.pawel@gmail.com',
      mailLink: false,
      mobile: '+48 519 084 2^8'
    }
    this.updateNumber = this.updateNumber.bind(this)
    this.updateMail = this.updateMail.bind(this)
  }
  updateNumber() {
    this.setState({mobile: '+48 519 084 256'})
  }
  updateMail() {
    this.setState({mailLink: true})
  }
  componentDidMount() {
    setTimeout(this.updateNumber, 1024)
  }
  render() {
    let mail = null;
    if (this.state.mailLink) {
      mail = <strong><a href={'mailto:' + this.state.mail}>{this.state.mail}</a></strong>
    } else {
      mail = <strong onMouseOver={this.updateMail}>{this.state.mail}</strong>
    }
    return <div className="about">
      <h2>Paweł Irla</h2>
      <h5>Full Stack Developer</h5>
      <div>{years} years old | Zielona Góra | Poland</div>
      <div>Mail: {mail} | Phone: <strong>{this.state.mobile}</strong></div>
    </div>
  }
}

export default About
