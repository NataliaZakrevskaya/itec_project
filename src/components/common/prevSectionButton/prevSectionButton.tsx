import React from 'react';

const PrevSectionButton = ({onClick}: PrevSectionButtonPropsType) => {
  return (
    <div onClick={onClick}/>
  );
};

export default PrevSectionButton;

type PrevSectionButtonPropsType = {
  onClick: () => void
}