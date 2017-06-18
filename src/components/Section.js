// @flow
import React from 'react';
import { Label } from 'reactstrap';
import '../styles/sections.scss';

type Props = {
  className?: string,
  anchor?: string,
  smallInfo?: string,
  title: string,
  info?: string,
  children: any
};

const Section = (props: Props) => {
  let className = 'section';
  if (props.className) {
    className = `section ${props.className}`;
  }
  return (<div className={className}>
    {props.anchor ? <a className="anchor" id={props.anchor} /> : '' }
    <Label>{props.title}</Label>
    {props.info && (<small className="info">{props.info}</small>)}
    {props.smallInfo && (<small className="small-info">{props.smallInfo}</small>)}
    <hr />
    <div className="section-content">
      {props.children}
    </div>
  </div>);
};

Section.defaultProps = {
  className: '',
  info: '',
  smallInfo: '',
  anchor: ''
};

export default Section;
