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
  render() {
    return <div>
      <h2>Paweł Irla</h2>
      <h5>Full Stack Developer &amp;&amp; Team leader</h5>
      <p>{years} years old | Zielona Góra | Poland</p>
    </div>
  }
}

export default About
