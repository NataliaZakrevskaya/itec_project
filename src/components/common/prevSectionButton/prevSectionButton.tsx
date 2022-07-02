import React from 'react';
import style from './prevSectionButton.module.scss';

const PrevSectionButton = ({onClick, disabled}: PrevSectionButtonPropsType) => {
  return (
    <button className={disabled ? `${style.button} ${style.disabledButton}` : style.button} onClick={onClick} disabled={disabled}/>
  );
};

export default PrevSectionButton;

type PrevSectionButtonPropsType = {
  disabled: boolean
  onClick: () => void
}