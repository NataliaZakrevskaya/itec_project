import React from 'react';
import style from './nextSectionButton.module.scss';

const NextSectionButton = ({onClick}: NextSectionButtonPropsType) => {
  return (
    <div className={style.button}  onClick={onClick}></div>
  );
};

export default NextSectionButton;

type NextSectionButtonPropsType = {
  onClick: () => void
}