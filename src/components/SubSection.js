import React from 'react'
import { Button, Label  } from 'reactstrap'
import '../styles/sections.scss'

const SubSection = (props) => (
  <div className="popover popover-static sub-section">
    <h3 className="popover-title">
      {props.title}
      <small style={{"float": "right"}}>{props.info}</small>
    </h3>
    <div className="popover-content">
      {props.children}
    </div>
  </div>
)

export default SubSection
