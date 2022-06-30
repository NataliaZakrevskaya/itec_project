import React from 'react';
import style from './prevSectionButton.module.scss';

const PrevSectionButton = ({onClick}: PrevSectionButtonPropsType) => {
  return (
    <div className={style.button} onClick={onClick}/>
  );
};

export default PrevSectionButton;

type PrevSectionButtonPropsType = {
  onClick: () => void
}