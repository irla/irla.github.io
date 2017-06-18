// @flow
import React from 'react';
import '../styles/sections.scss';

type Props = {
  className?: string,
  title: string,
  info?: string,
  children: any
}

const SubSection = (props: Props) => (
  <div className={`popover popover-static sub-section ${props.className}`}>
    <h3 className="popover-title">
      {props.title}
      <small style={{ float: 'right' }}>{props.info}</small>
    </h3>
    <div className="popover-content">
      {props.children}
    </div>
  </div>
);

SubSection.defaultProps = {
  className: '',
  info: ''
};

export default SubSection;
