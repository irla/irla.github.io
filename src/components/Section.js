import React from 'react'
import { Button, Label  } from 'reactstrap'
import '../styles/sections.scss'

const Section = (props) => (
  <div className={"section " + props.className}>
    <Label>{props.label}</Label>
    <hr/>
    {props.children}
  </div>
)

export default Section
