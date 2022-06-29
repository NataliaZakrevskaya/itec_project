import React from 'react';
import nextIcon from '../../../Images/nextIcon.svg';
import style from './nextSectionButton.module.scss'

const NextSectionButton = ({onClick}: NextSectionButtonType) => {
  return (
    <div className={style.nextSectionButtonArrow}  onClick={() => alert('next')}>

    </div>
  );
};

export default NextSectionButton;

type NextSectionButtonType = {
  onClick: () => void
}