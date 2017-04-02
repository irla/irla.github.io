import React, {Component} from 'react'
import { Button, Container, Progress, Badge, Row, Col} from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import '../styles/timeline.scss'

import Popover from '../components/StaticPopover.js'
import Section from '../components/Section.js'

function highlight(value, filter, def = false) {
  if (! filter) return def
  return value.toLowerCase().includes(filter.toLowerCase())
}

const Project = ({project, position, filter}) => {
  const technologies = project.technologies.map((tech) =>(
    <Badge className={highlight(tech, filter) ? "highlight" : ""}>{tech}</Badge>
  ))
  return <Popover
            title={project.name}
            position={position}
            startDate={project.startDate}
            footer={technologies}>
    {project.description}
  </Popover>
}

const Circle = ({children}) => (
  <Row>
    <Col xs="5"></Col>
    <Col xs="2" className="text-center"><Badge pill className="year-circle"><h6>{children}</h6></Badge></Col>
    <Col xs="5" offset></Col>
  </Row>
)

const Year = ({year, commercials, hobby, filter}) => (
  <Row>
    <Col xs="6" className="timeline-left">
      {commercials.has(year) && commercials.get(year).map((project) => <Project project={project} position="left" filter={filter}/>)}
    </Col>
    <Col xs="6" className="timeline-right">
      {hobby.has(year) && hobby.get(year).map((project) => <Project project={project} position="right" filter={filter}/>)}
    </Col>
  </Row>
)

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortDir: 'desc'
    }
    this.changeSort = this.changeSort.bind(this)
  }
  groupProjectsByYear(projects) {
    const map = new Map()
    projects
      .filter(project => (
        project.technologies.filter(technology => highlight(technology, this.props.filter, true)).length > 0
      ))
      .forEach((project) =>{
      const year = (new Date(project.startDate)).getFullYear()
      if (!map.has(year)) {
        map.set(year, [project])
      } else {
        map.get(year).push(project)
      }
    })
    return map
  }
  changeSort() {
    this.setState(prevState => {
      if (prevState.sortDir == 'desc') {
        return {sortDir: 'asc'}
      }
      return {sortDir: 'desc'}
    })
  }
  render() {
    const years = []
    const {projects} = this.props
    const commercials = this.groupProjectsByYear(projects.commercial)
    const hobby = this.groupProjectsByYear(projects.hobby)
    const currYear = (new Date()).getFullYear()
    if (this.state.sortDir == 'desc') {
      for (let i = currYear; i > 2000; i--) {
        if (commercials.has(i) || hobby.has(i)) {
          years.push(<Circle>{i}</Circle>)
          years.push(<Year year={i} commercials={commercials} hobby={hobby} filter={this.props.filter}/>)
        }
      }
    } else {
      for (let i = 2000; i <= currYear; i++) {
        if (commercials.has(i) || hobby.has(i)) {
          years.push(<Circle>{i}</Circle>)
          years.push(<Year year={i} commercials={commercials} hobby={hobby} filter={this.props.filter}/>)
        }
      }
    }

    return <Section className="timeline" label="Projects">
      <Row className="header">
        <Col xs="5">
          <h4>Commercial</h4>
        </Col>
        <Col xs="2" className="text-center">
          <FontAwesome name={this.state.sortDir == 'desc' ? 'arrow-circle-up' : 'arrow-circle-down'} onClick={this.changeSort} style={{fontSize: "2.2em", cursor: "pointer"}}/>
        </Col>
        <Col xs="5">
          <h4>Hobby</h4>
        </Col>
      </Row>
      {years}
    </Section>
  }
}

export default Projects
