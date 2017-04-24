import React from 'react'
import { Button, Label  } from 'reactstrap'
import '../styles/sections.scss'

const Section = (props) => (
  <div className={"section " + props.className}>
    {props.anchor ? <a className="anchor" id={props.anchor}/> : ''}
    <Label>{props.title}</Label>
    <small className="info">{props.info}</small>
    {props.smallInfo && (<small className="small-info">{props.smallInfo}</small>)}
    <hr/>
    <div className="section-content">
      {props.children}
    </div>
  </div>
)

export default Section
