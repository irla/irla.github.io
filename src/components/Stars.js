import React, {Component} from 'react'
import { Button, Container, Progress, Badge  } from 'reactstrap'
import FontAwesome from 'react-fontawesome'


const Stars = ({score = 0}) => {
    const stars = []
    if (score > 0) {
      for (var i = 1; i < 10; i += 2) {
        if (i < score) {
          stars.push(<FontAwesome name='star'/>)
        } else if (i == score) {
          stars.push(<FontAwesome name='star-half-full'/>)
        } else if (i > score) {
          stars.push(<FontAwesome name='star-o'/>)
        }
      }
    }
    return <span>{stars}</span>
}

export default Stars
