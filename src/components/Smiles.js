import React, {Component} from 'react'
import { Button, Container, Progress, Badge  } from 'reactstrap'
import FontAwesome from 'react-fontawesome'


const Smiles = ({smiles = 0}) => {
    const icons = []
    for (var i = 0; i < smiles; i++) {
      icons.push(<FontAwesome key={'smile' + i} name="smile-o" />)
    }
    return <span>{icons}</span>
}

export default Smiles
