import React, {Component} from 'react'
import { Button, Container, Row, Col  } from 'reactstrap'
import Section from '../components/Section.js'
import SubSection from '../components/SubSection.js'
import Skills from '../components/Skills.js'
import Stars from '../components/Stars.js'

class SkillsAndInterests extends Component {

  render() {
    const skills = this.props.skills.map((skill) =>
      <SubSection title={skill.name}>
        <Skills skill={skill} filter={this.props.filter}/>
      </SubSection>
    )

    const languages = this.props.languages.map((lang) =>
      <div>{lang.name}: {lang.level} <span className="pull-right"><Stars score={lang.score}/></span></div>
    )

    const interests = this.props.interests.map((interest) =>
      <span>{interest.name}, </span>
    )

    return <div>
        <Row>
          <Col>
            <Section title="Skills" info="Move the mouse over skill to see details" className="skills">
              {skills}
            </Section>
          </Col>
        </Row>
        {!this.props.filter && [
          <Row>
            <Col>
              <Section title="Interests">
                {interests}
              </Section>
            </Col>
          </Row>,
          <Row>
            <Col>
              <Section title="Languages">
                {languages}
              </Section>
            </Col>
          </Row>
        ]}
      </div>
  }
}

export default SkillsAndInterests
