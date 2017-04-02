import React, {Component} from 'react'
import { Button, Container, Progress, Badge  } from 'reactstrap'
import FontAwesome from 'react-fontawesome'


class Stars extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const stars = []
    for (var i = 1; i < 10; i += 2) {
      if (i < this.props.score) {
        stars.push(<FontAwesome name='star'/>)
      } else if (i == this.props.score) {
        stars.push(<FontAwesome name='star-half-full'/>)
      } else if (i > this.props.score) {
        stars.push(<FontAwesome name='star-o'/>)
      }
    }
    return <span>{stars}</span>
  }
}

export default Stars
