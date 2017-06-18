// @flow
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import Skills from '../components/Skills';
import Stars from '../components/Stars';
import { SkillDataType, LanguageDataType, InterestDataType } from '../data/types';

class SkillsAndInterests extends Component {
  props: {
    skills: SkillDataType[],
    languages: LanguageDataType[],
    interests: InterestDataType[],
    filter: ?string
  }
  render() {
    const skills = this.props.skills.map((skill) => (
      <SubSection title={skill.name}>
        <Skills skill={skill} filter={this.props.filter} />
      </SubSection>
    ));

    const languages = this.props.languages.map((lang) =>
      <div>{lang.name}: {lang.level} <span className="pull-right hidden-print"><Stars score={lang.score} /></span></div>
    );

    const interests = this.props.interests.map((interest) =>
      <span>{interest.name}, </span>
    );

    return (<div>
      <Row>
        <Col>
          <Section
            title="Skills"
            info="Move the mouse over the skill to see details"
            smallInfo="Tap the skill to see the details"
            className="skills"
          >
            {skills}
          </Section>
        </Col>
      </Row>
      {!this.props.filter && [
        <Row>
          <Col>
            <Section title="Interests" className="padded-section">
              {interests}
            </Section>
          </Col>
        </Row>,
        <Row>
          <Col>
            <Section title="Languages" className="padded-section">
              {languages}
            </Section>
          </Col>
        </Row>
      ]}
    </div>);
  }
}

export default SkillsAndInterests;
