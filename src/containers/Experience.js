import React from 'react'
import { Button, Container, Row, Col, Progress } from 'reactstrap'
import Section from '../components/Section.js'
import SubSection from '../components/SubSection.js'
import Popover from '../components/StaticPopover.js'

import {dates} from '../helpers.js'

const Work = ({work}) => (
  <SubSection title={work.company} info={dates.range(work.startDate, work.endDate)}>
    <Container>
      <Row>
        <Col><h6>{work.position}</h6></Col>
      </Row>
      <Row>
        <Col>{work.summary}</Col>
      </Row>
    </Container>
  </SubSection>
)

const Education = ({education}) => (
  <SubSection title={education.institution} info={dates.range(education.startDate, education.endDate)}>
    <Container>
      <Row>
        <Col><h6>{education.studyType} - {education.area}</h6></Col>
      </Row>
      <Row>
        <Col>{education.summary.map(sum => <div>{sum}</div>)}</Col>
      </Row>
    </Container>
  </SubSection>
)

const Experience = (props) => {
  const works = props.works.map(work => (<Work work={work} />))
  const education = props.education.map(education => (<Education education={education} />))
  return <div>
    <Section title="Education">
      {education}
    </Section>
    <Section title="Experience">
      {works}
    </Section>
  </div>
}

export default Experience
