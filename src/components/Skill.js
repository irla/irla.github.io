// @flow
import React, { Component } from 'react';
import { Badge, Popover, PopoverContent } from 'reactstrap';
import '../styles/skills.scss';
import Stars from './Stars';
import Smiles from './Smiles';

const idIt = (str: any) => str.replace(/\s/g, '_');

type Props = {
  children: any,
  highlight: ?boolean,
  score: ?number,
  smiles: ?number,
  description: string
}

class Skill extends Component {
  props: Props;
  state: {
    popoverOpen: boolean
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
  }
  leave() {
    this.setState({
      popoverOpen: false
    });
  }
  enter() {
    this.setState({
      popoverOpen: true
    });
  }
  render() {
    return (<span onMouseEnter={this.enter.bind(this)} onMouseLeave={this.leave.bind(this)} className="skill">
      <Badge id={idIt(this.props.children)} className={this.props.highlight ? 'highlight' : ''}>{this.props.children}</Badge>
      <Popover placement="bottom" isOpen={this.state.popoverOpen} target={idIt(this.props.children)}>
        <PopoverContent>
          {this.props.score && <Stars score={this.props.score} />}
          {this.props.smiles && <Smiles smiles={this.props.smiles} />}
          <div>{this.props.description}</div>
        </PopoverContent>
      </Popover>
    </span>);
  }
}

export default Skill;
