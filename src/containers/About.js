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
      mail: 'ir1a.pawe1@gmai1.com',
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
    let mail = this.state.mail;
    if (mail.indexOf('1') > -1) {
      mail = mail.replace('1', 'l')
      this.setState({mail: mail})
      setTimeout(this.updateMail, 128)
    } else {
      this.setState({mailLink: true})
    }
  }
  componentDidMount() {
    setTimeout(this.updateNumber, 2048)
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
      <h5>Full Stack Developer &amp;&amp; Team leader</h5>
      <div>{years} years old | Zielona Góra | Poland</div>
      <div>Mail: {mail} | Phone: <strong>{this.state.mobile}</strong></div>
    </div>
  }
}

export default About
