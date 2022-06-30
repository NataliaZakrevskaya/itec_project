import React from 'react';
import style from './nextSectionButton.module.scss';

const NextSectionButton = ({onClick}: NextSectionButtonPropsType) => {
  return (
    <div className={style.nextSectionButtonArrow}  onClick={onClick}/>
  );
};

export default NextSectionButton;

type NextSectionButtonPropsType = {
  onClick: () => void
}