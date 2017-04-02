import React from 'react'
import { Button, Label  } from 'reactstrap'
import '../styles/sections.scss'

const SubSection = (props) => (
  <div className="sub-section">
    <Label>{props.label}</Label>
    {props.children}
  </div>
)

export default SubSection
