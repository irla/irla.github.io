// @flow
import React from 'react';
import FontAwesome from 'react-fontawesome';

type Props = {
  smiles: number
};

const Smiles = ({ smiles = 0 } : Props) => {
  const icons = [];
  for (let i = 0; i < smiles; i += 1) {
    icons.push(<FontAwesome key={`smile${i}`} name="smile-o" />);
  }
  return (<span>{icons}</span>);
};

export default Smiles;
