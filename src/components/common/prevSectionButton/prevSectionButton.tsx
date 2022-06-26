import React from 'react';
import prevIcon from '../../../Images/prevIcon.svg';

const PrevSectionButton = ({onClick}: PrevSectionButton) => {
  return (
    <div onClick={onClick}>
      <img src={ prevIcon } alt="prevIcon"/>
    </div>
  );
};

export default PrevSectionButton;

type PrevSectionButton = {
  onClick: () => void
}