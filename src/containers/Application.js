import React, {Component} from 'react'
import { Button, Container, Row, Col, Input, Form, FormGroup, Jumbotron  } from 'reactstrap'

import SkillsAndInterests from './SkillsAndInterests.js'
import Experience from './Experience.js'
import Projects from './Projects.js'

import projectData from '../data/projects.json'
import skillData from '../data/skills.json'
import experience from '../data/experience.json'

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

class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      sortDir: 'desc'
    }
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onClearClicked = this.onClearClicked.bind(this)
    this.onChangeSort = this.onChangeSort.bind(this)
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
  onChangeSort() {
    this.setState(prevState => {
      console.log(prevState.sortDir)
      if (prevState.sortDir == 'desc') {
        return {sortDir: 'asc'}
      }
      return {sortDir: 'desc'}
    })
  }
  render() {
    const projects = <Projects projects={projectData} filter={this.state.filter} onChangeSort={this.onChangeSort} sortDir={this.state.sortDir}/>
    const skills = <SkillsAndInterests skills={skillData.skills} interests={skillData.interests}
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
          <Col xs="8"><Experience works={experience.work} education={experience.education}/></Col>
          <Col xs="4">{skills}</Col>
        </Row>
      )
      body.push(<Container><Row>{projects}</Row></Container>)
    }
    return <Container>
      <Row class="header">
        <Col xs="8">
          <h1>Paweł Irla</h1>
          <span>Portfolio page - work in progress</span>
          <hr />
        </Col>
        <Col xs="4">
          <Form inline>
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

export default Application
