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
            <Section title="Skills"
                     info="Move the mouse over the skill to see details"
                     smallInfo="Tap the skill to see the details"
                     className="skills">
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
      </div>
  }
}

export default SkillsAndInterests
