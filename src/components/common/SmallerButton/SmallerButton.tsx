import React from 'react';
import style from './SmallerButton.module.scss';

const SmallerButton = ({ title, onClick }: SmallerButtonPropsType) => {
  return (
    <div className={style.smallerButtonMoreProducts}>
      <button className={style.button} onClick={onClick}>{ title }</button>
    </div>
  );
};

export default SmallerButton;

type SmallerButtonPropsType = {
  title: string
  onClick: () => void
}