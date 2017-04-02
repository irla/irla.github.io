import React from 'react'

const Popover = (props) => {
  const opposite = (props.position == "left" ? "right" : "left")
  return <div className={"popover popover-static popover-" + props.position}>
    <h3 className="popover-title">
      <span style={{"float": props.position}}>{props.title}</span>
      &nbsp;
      <small style={{"float": opposite}}>{props.startDate}</small>
    </h3>
    <div className="popover-content">
      {props.children}
    </div>
    <div className="popover-footer">{props.footer}</div>
  </div>
}

export default Popover
