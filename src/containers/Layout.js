import React, {Component} from 'react'
import { Button, Container, Row, Col, Input, Form, FormGroup  } from 'reactstrap'

import Right from './Rigth.js'
import Center from './Center.js'
import Projects from './Projects.js'

import projectData from '../data/projects.json'
import skillData from '../data/skills.json'

const jsonResume = {
  "basics": {
    "name": "John Doe",
    "label": "Programmer",
    "picture": "",
    "email": "john@gmail.com",
    "phone": "(912) 555-4321",
    "website": "http://johndoe.com",
    "summary": "A summary of John Doe...",
    "location": {
      "address": "2712 Broadway St",
      "postalCode": "CA 94115",
      "city": "San Francisco",
      "countryCode": "US",
      "region": "California"
    },
    "profiles": [{
      "network": "Twitter",
      "username": "john",
      "url": "http://twitter.com/john"
    }]
  },
  "awards": [{
    "title": "Award",
    "date": "2014-11-01",
    "awarder": "Company",
    "summary": "There is no spoon."
  }],
  "publications": [{
    "name": "Publication",
    "publisher": "Company",
    "releaseDate": "2014-10-01",
    "website": "http://publication.com",
    "summary": "Description..."
  }],
  "references": [{
    "name": "Jane Doe",
    "reference": "Reference..."
  }]
}

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: ''
    }
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onClearClicked = this.onClearClicked.bind(this)
  }
  onFilterChange(event) {
    this.setState({
      filter: event.target.value
    })
  }
  onClearClicked(event) {
    this.setState({
      filter: ''
    })
    event.preventDefault()
  }
  render() {
    const projects = <Projects projects={projectData} filter={this.state.filter}/>
    const skills = <Right skills={skillData.skills} interests={skillData.interests}
                          languages={skillData.languages} filter={this.state.filter} />
    const body = []
    if (this.state.filter) {
      body.push(
        <Row>
          <Col xs="8">{projects}</Col>
          <Col xs="4">{skills}</Col>
        </Row>
      )
    } else {
      body.push(
        <Row>
          <Col xs="8"><Center /></Col>
          <Col xs="4">{skills}</Col>
        </Row>
      )
      body.push(<Row>{projects}</Row>)
    }
    return <Container>
      <Row>
        <Col xs="6">
          <h1>Paweł Irla</h1>
          <span>Portfolio page - work in progress</span>
        </Col>
        <Col xs="6">
          <Form inline className="float-right">
            <FormGroup>
              <Input placeholder="Filter..." value={this.state.filter} onChange={this.onFilterChange}/>
              <Button onClick={this.onClearClicked}>Clear</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      {body}
    </Container>
  }
}

export default Layout
