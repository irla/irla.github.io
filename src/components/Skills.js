// @flow
import React, { Component } from 'react';
import '../styles/skills.scss';
import Skill from './Skill';
import type SkillDataType from '../data/types';


class Skills extends Component {
  props: {
    filter: ?string,
    skill: SkillDataType
  }
  highlight(value: string) {
    if (this.props.filter) {
      return value.toLowerCase().includes(this.props.filter.toLowerCase());
    }
    return false;
  }
  render() {
    const details = this.props.skill.details;
    const skills = Object.keys(details).map((key) => (<Skill
      score={details[key].score}
      smiles={details[key].smiles}
      description={details[key].info}
      highlight={this.highlight(key)}
    >
      {key}
    </Skill>));

    return (<div>
      {skills}
    </div>);
  }
}

export default Skills;
