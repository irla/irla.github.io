import React from 'react'
import { Button, Label  } from 'reactstrap'
import '../styles/sections.scss'

const Section = (props) => (
  <div className={"section " + props.className}>
    {props.anchor ? <a className="anchor" id={props.anchor}/> : ''}
    <Label>{props.title}</Label>
    <small>{props.info}</small>
    <hr/>
    {props.children}
  </div>
)

export default Section
