import React, {Component} from 'react'
import {Badge, Popover, PopoverTitle, PopoverContent} from 'reactstrap'
import FontAwesome from 'react-fontawesome'

import '../styles/skills.scss'
import Stars from './Stars.js'


class Skill extends Component {
  constructor(props) {
    super(props)
    this.leave = this.leave.bind(this)
    this.enter = this.enter.bind(this)
    this.state = {
      popoverOpen: false
    };
  }
  leave() {
    this.setState({
      popoverOpen: false
    });
  }
  enter(){
    this.setState({
      popoverOpen: true
    });
  }
  render() {
    return <span onMouseEnter={this.enter} onMouseLeave={this.leave} className="skill">
      <Badge id={this.props.children + '_badge'} className={this.props.highlight ? "highlight" : ""}>{this.props.children}</Badge>
      <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.props.children + '_badge'}>
        <PopoverContent>
          <Stars score={this.props.score}/>
          <div>{this.props.description}</div>
        </PopoverContent>
      </Popover>
    </span>
  }
}

class Skills extends Component {
  constructor(props) {
    super(props)
  }
  highlight(value) {
    if (! this.props.filter) return false
    return value.toLowerCase().includes(this.props.filter.toLowerCase())
  }
  render() {
    const details = this.props.skill.details
    const skills = Object.keys(details).map((key) =>
        <Skill score={details[key].score} description={details[key].info} highlight={this.highlight(key)}>{key}</Skill>
    )

    return <div>
      {skills}
    </div>
  }
}

export default Skills
