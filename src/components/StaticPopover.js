// @flow
import React from 'react';

type Props = {
  position: string,
  title: string,
  startDate: string,
  children: any,
  footer: any
};

const Popover = (props: Props) => {
  const opposite = (props.position === 'left' ? 'right' : 'left');
  return (<div className={`popover popover-static popover-${props.position}`}>
    <h4 className="popover-title">
      <span style={{ float: props.position }}>{props.title}</span>
      &nbsp;
      <small style={{ float: opposite }}>{props.startDate}</small>
    </h4>
    <div className="popover-content">
      {props.children}
    </div>
    <div className="popover-footer">{props.footer}</div>
  </div>);
};

export default Popover;
