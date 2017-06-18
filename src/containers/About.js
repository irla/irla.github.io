// @flow
import React, { Component } from 'react';

const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const years = calculateAge(new Date('1983-10-11'));

class About extends Component {
  state: {
    mail: string,
    mailLink: boolean,
    mobile: string
  };
  constructor() {
    super();
    this.state = {
      mail: 'irla.pawel@gmail.com',
      mailLink: false,
      mobile: '+48 519 084 2^8'
    };
  }
  componentDidMount() {
    setTimeout(this.updateNumber.bind(this), 1024);
  }
  updateNumber() {
    this.setState({ mobile: '+48 519 084 256' });
  }
  updateMail() {
    this.setState({ mailLink: true });
  }
  render() {
    let mail = null;
    if (this.state.mailLink) {
      mail = (<strong><a href={`mailto:${this.state.mail}`}>{this.state.mail}</a></strong>);
    } else {
      mail = (<strong onMouseOver={this.updateMail.bind(this)}>{this.state.mail}</strong>);
    }
    return (<div className="about">
      <h2>Paweł Irla</h2>
      <h5>Full Stack Developer</h5>
      <div>{years} years old | Zielona Góra | Poland</div>
      <div>Mail: {mail} | Phone: <strong>{this.state.mobile}</strong></div>
    </div>);
  }
}

export default About;
