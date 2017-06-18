import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import { dates } from '../helpers';
import type { WorkDataType, EducationDataType } from '../data/types';

type WorkProps = {
  work: WorkDataType
};

const Work = ({ work } : WorkProps) => (
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
);

type EducationProps = {
  education: EducationDataType
};

const Education = ({ education } : EducationProps) => (
  <SubSection title={education.institution} info={dates.range(education.startDate, education.endDate)} className="education-section">
    <Container>
      <Row>
        <Col><h6>{education.studyType} - {education.area}</h6></Col>
      </Row>
      <Row>
        <Col>{education.summary.map(sum => <div>{sum}</div>)}</Col>
      </Row>
    </Container>
  </SubSection>
);

type Props = {
  works: WorkDataType[],
  education: EducationDataType[]
};

const Experience = (props : Props) => {
  const works = props.works.map((work, index) => <Work key={`work-${index}`} work={work} />);
  const education = props.education.map((edu, index) => <Education key={`education-${index}`} education={edu} />);
  return (<div>
    <Section anchor="education" title="Education">
      {education}
    </Section>
    <Section anchor="experience" title="Experience">
      {works}
    </Section>
  </div>);
};

export default Experience;
