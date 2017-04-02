import React, {Component} from 'react'
import { Button, Container, Row, Col  } from 'reactstrap'
import Section from '../components/Section.js'
import SubSection from '../components/SubSection.js'
import Skills from '../components/Skills.js'
import Stars from '../components/Stars.js'

class Right extends Component {

  render() {
    const skills = this.props.skills.map((skill) =>
      <SubSection label={skill.name}>
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
            <Section label="Skills">
              {skills}
            </Section>
          </Col>
        </Row>
        <Row>
          <Col>
            <Section label="Interests">
              {interests}
            </Section>
          </Col>
        </Row>
        <Row>
          <Col>
            <Section label="Languages">
              {languages}
            </Section>
          </Col>
        </Row>
      </div>
  }
}

export default Right
