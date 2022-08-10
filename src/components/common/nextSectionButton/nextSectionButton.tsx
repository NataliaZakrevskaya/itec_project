import React from 'react';
import style from './nextSectionButton.module.scss';

const NextSectionButton = ({onClick, disabled}: NextSectionButtonPropsType) => {
  return (
    <button
      className={ disabled ? `${style.button} ${style.disabledButton}` : style.button }
      onClick={ onClick }
      disabled={disabled}
      name={'nextSection'}
    />
  );
};

export default NextSectionButton;

type NextSectionButtonPropsType = {
  disabled: boolean,
  onClick: () => void
}