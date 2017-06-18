// @flow
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/print.scss';
import img from '../images/pawel_irla_pic.jpg';

import SkillsAndInterests from './SkillsAndInterests';
import Experience from './Experience';
import Section from '../components/Section';
import Projects from './Projects';
import Filter from './Filter';
import About from './About';

import projectData from '../data/projects.json';
import skillData from '../data/skills.json';
import experience from '../data/experience.json';


class Application extends Component {
  state: {
    filter: string,
    sortDir: string
  };
  constructor() {
    super();
    this.state = {
      filter: '',
      sortDir: 'desc'
    };
  }
  onFilterChange(value: string) {
    this.setState({
      filter: value
    });
  }
  onChangeSort() {
    this.setState(prevState => {
      if (prevState.sortDir === 'desc') {
        return { sortDir: 'asc' };
      }
      return { sortDir: 'desc' };
    });
  }
  render() {
    const projects = (<Projects
      projects={projectData}
      filter={this.state.filter}
      onChangeSort={this.onChangeSort.bind(this)}
      sortDir={this.state.sortDir}
    />);

    const skills = (<SkillsAndInterests
      skills={skillData.skills}
      interests={skillData.interests}
      languages={skillData.languages}
      filter={this.state.filter}
    />);

    const jumbotron = (<Row key="jumbotron" className="jumbotron">
      <Col xs="4" md="2">
        <img src={img} className="img-thumbnail" alt="This is me, 10 years ago :)" />
      </Col>
      <Col xs="8" md="6">
        <About />
      </Col>
      <Col xs="12" md="4">
        <Section anchor="about" title="About Me">
          Passionate about doing projects, either frontend or backend focused.
          Always happy to help team members and mentor junior developers. Relish a challenges.
        </Section>
      </Col>
    </Row>);

    const body = [];
    if (this.state.filter) {
      body.push(
        <Row key="projects-and-skills" className="filtered">
          <Col xs="12" md="8" className="projects">{projects}</Col>
          <Col xs="12" md="4" className="skills">{skills}</Col>
        </Row>
      );
    } else {
      body.push(jumbotron);
      body.push(
        <Row key="experience-and-skills">
          <Col xs="12" md="8"><Experience works={experience.work} education={experience.education} /></Col>
          <Col xs="12" md="4">{skills}</Col>
        </Row>
      );
      body.push(<Row className="page-break-before"><Col xs="12"><Container key="projects-container" >{projects}</Container></Col></Row>);
    }
    return (<Container>
      <Filter onFilterChange={this.onFilterChange.bind(this)} />
      {body}
    </Container>);
  }
}

export default Application;
