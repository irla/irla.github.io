import React, {Component} from 'react'
import { Button, Container, Row, Col } from 'reactstrap'

import print from '../styles/print.scss'

import img from '../images/pawel_irla_pic.jpg'

import SkillsAndInterests from './SkillsAndInterests.js'
import Experience from './Experience.js'
import Section from '../components/Section.js'
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

    const jumbotron = <Row key="jumbotron" className="jumbotron">
      <Col xs="3" md="2">
        <img src={img} className="img-thumbnail"/>
      </Col>
      <Col xs="9" md="6">
        <About />
      </Col>
      <Col xs="12" md="4">
        <Section anchor="about" title="About Me">
          Passionate about doing projects, either frontend or backend focused. Always happy to help team members and mentor junior developers. Relish a challenges.
        </Section>
      </Col>
    </Row>

    const body = []
    if (this.state.filter) {
      body.push(
        <Row key="projects-and-skills" className="filtered">
          <Col xs="12" md="8" className="projects">{projects}</Col>
          <Col xs="12" md="4" className="skills">{skills}</Col>
        </Row>
      )
    } else {
      body.push(jumbotron)
      body.push(
        <Row key="experience-and-skills">
          <Col xs="12" md="8"><Experience works={experience.work} education={experience.education}/></Col>
          <Col xs="12" md="4">{skills}</Col>
        </Row>
      )
      body.push(<Container key="projects-container" className="page-break-before"><Row>{projects}</Row></Container>)
    }
    return <Container>
      <Filter onFilterChange={this.onFilterChange} />
      {body}
    </Container>
  }
}

export default Application
