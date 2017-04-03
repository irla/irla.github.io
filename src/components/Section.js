import React from 'react'
import { Button, Label  } from 'reactstrap'
import '../styles/sections.scss'

const Section = (props) => (
  <div className={"section " + props.className}>
    <Label>{props.title}</Label>
    <small>{props.info}</small>
    <hr/>
    {props.children}
  </div>
)

export default Section
