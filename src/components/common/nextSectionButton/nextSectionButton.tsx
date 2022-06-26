import React from 'react';
import nextIcon from '../../../Images/nextIcon.svg';

const NextSectionButton = ({onClick}: NextSectionButtonType) => {
  return (
    <div  onClick={() => alert('next')}>
      <img src={ nextIcon } alt="nextIcon"/>
    </div>
  );
};

export default NextSectionButton;

type NextSectionButtonType = {
  onClick: () => void
}