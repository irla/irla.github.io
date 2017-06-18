// @flow
import React from 'react';
import FontAwesome from 'react-fontawesome';

type Props = {
  score: number
}

const Stars = ({ score = 0 } : Props) => {
  const stars = [];
  if (score > 0) {
    for (let i = 1; i < 10; i += 2) {
      if (i < score) {
        stars.push(<FontAwesome name="star" />);
      } else if (i === score) {
        stars.push(<FontAwesome name="star-half-full" />);
      } else if (i > score) {
        stars.push(<FontAwesome name="star-o" />);
      }
    }
  }
  return (<span>{stars}</span>);
};

export default Stars;
