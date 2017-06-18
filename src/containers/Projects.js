// @flow
import React, { Component } from 'react';
import { Badge, Row, Col } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import '../styles/timeline.scss';
import Popover from '../components/StaticPopover';
import Section from '../components/Section';
import { dates } from '../helpers';
import { ProjectDataType } from '../data/types';

function highlight(value: string, filter: ?string, def: boolean = false) {
  if (!filter) return def;
  return value.toLowerCase().includes(filter.toLowerCase());
}

type ProjectProps = {
  filter: string,
  position: string,
  project: ProjectDataType
}
const Project = ({ project, position, filter } : ProjectProps) => {
  const technologies = project.technologies.map((tech) => (
    <Badge className={highlight(tech, filter) ? 'highlight' : ''}>{tech}</Badge>
  ));
  const footer = (<div>
    {technologies}
    {project.url && <div className="text-right"><a href={project.url}>{project.url}</a></div>}
  </div>);
  return (<Popover
    title={project.name}
    position={position}
    startDate={dates.range(project.startDate, project.endDate)}
    footer={footer}
  >
    <div>{project.description}</div>
    {project.role && <div style={{ paddingTop: '11px' }}><b>My role: </b>{project.role}</div>}
  </Popover>);
};

type CircleProps = {
  children: any
};
const Circle = ({ children } : CircleProps) => (
  <Row>
    <Col xs="4" />
    <Col xs="4" className="text-center"><Badge pill className="year-circle"><h6>{children}</h6></Badge></Col>
    <Col xs="4" offset />
  </Row>
);

type YearProps = {
  year: number,
  commercials: Map<number, ProjectDataType[]>,
  hobby: Map<number, ProjectDataType[]>,
  filter: ?string
}
const Year = ({ year, commercials, hobby, filter } : YearProps) => (
  <div className="print-no-break">
    <Circle>{year}</Circle>
    <Row>
      <Col xs="12" md="6" className="timeline-left">
        {commercials.has(year) && commercials.get(year).map((project) => <Project project={project} position="left" filter={filter}/>)}
      </Col>
      <Col xs="12" md="6" className="timeline-right">
        {hobby.has(year) && hobby.get(year).map((project) => <Project project={project} position="right" filter={filter}/>)}
      </Col>
    </Row>
  </div>
);

class Projects extends Component {
  props: {
    filter: ?string,
    sortDir: ?string,
    projects: {
      commercial: ProjectDataType[],
      hobby: ProjectDataType[]
    },
    onChangeSort: () => void
  };
  groupProjectsByYear(projects: ProjectDataType[]): Map<number, ProjectDataType[]> {
    const map = new Map();
    projects
      .filter(project => (
        project.technologies.filter(
          technology => highlight(technology, this.props.filter, true)).length > 0
      ))
      .forEach((project) => {
        const year = (new Date(project.startDate)).getFullYear();
        if (!map.has(year)) {
          map.set(year, [project]);
        } else {
          map.get(year).push(project);
        }
      });
    return map;
  }
  render() {
    const years = [];
    const commercials = this.groupProjectsByYear(this.props.projects.commercial);
    const hobby = this.groupProjectsByYear(this.props.projects.hobby);
    const currYear = (new Date()).getFullYear();
    if (this.props.sortDir === 'desc') {
      for (let i = currYear; i > 2000; i -= 1) {
        if (commercials.has(i) || hobby.has(i)) {
          years.push(<Year key={`year-${i}`} year={i} commercials={commercials} hobby={hobby} filter={this.props.filter} />);
        }
      }
    } else {
      for (let i = 2000; i <= currYear; i += 1) {
        if (commercials.has(i) || hobby.has(i)) {
          years.push(<Year key={`year-${i}`} year={i} commercials={commercials} hobby={hobby} filter={this.props.filter} />);
        }
      }
    }

    if (years.length === 0) {
      years.push(<Row><Col className="text-center">Sorry, no projects found :(</Col></Row>);
    }

    return (<Section anchor="projects" className="timeline" title="Projects Timeline" info="Click arrow below to change sort direction">
      <Row className="header">
        <Col xs="4">
          <h4 className="hidden-sm-down">Commercial</h4>
        </Col>
        <Col xs="4" className="text-center">
          <FontAwesome
            name={this.props.sortDir === 'desc' ? 'arrow-circle-up' : 'arrow-circle-down'}
            onClick={this.props.onChangeSort}
            style={{ fontSize: '2.2em', cursor: 'pointer' }}
            className="hidden-print"
          />
        </Col>
        <Col xs="4">
          <h4 className="hidden-sm-down">Hobby</h4>
        </Col>
      </Row>
      {years}
    </Section>);
  }
}

export default Projects;
