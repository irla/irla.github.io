import React, {Component} from 'react'
import { Button, Container, Row, Col } from 'reactstrap'

import print from '../styles/print.scss'

import img from '../images/pawel_irla_pic.jpg'

import SkillsAndInterests from './SkillsAndInterests.js'
import Experience from './Experience.js'
import Projects from './Projects.js'
import Filter from './Filter.js'
import About from './About.js'

import projectData from '../data/projects.json'
import skillData from '../data/skills.json'
import experience from '../data/experience.json'


class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      sortDir: 'desc'
    }
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onChangeSort = this.onChangeSort.bind(this)
  }
  onFilterChange(value) {
    this.setState({
      filter: value
    })
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
        <Row key="projects-and-skills">
          <Col xs="8">{projects}</Col>
          <Col xs="4">{skills}</Col>
        </Row>
      )
    } else {
      body.push(
        <Row key="experience-and-skills">
          <Col xs="8"><Experience works={experience.work} education={experience.education}/></Col>
          <Col xs="4">{skills}</Col>
        </Row>
      )
      body.push(<Container key="projects-container"><Row>{projects}</Row></Container>)
    }
    return <Container>
      <Row className="header">
        <Col xs="2">
          <img src={img} className="img-thumbnail"/>
        </Col>
        <Col xs="6">
          <About />
        </Col>
        <Col xs="4" className="filter-container">
          <Filter onFilterChange={this.onFilterChange} />
        </Col>
      </Row>
      <Row><Col><hr /></Col></Row>
      {body}
    </Container>
  }
}

export default Application
