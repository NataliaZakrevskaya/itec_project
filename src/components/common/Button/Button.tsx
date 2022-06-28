import React from 'react';
import style from './Button.module.scss';

const Button = ( { title, onClick }: ButtonPropsType ) => {
  return (
      <div className={style.buttonMoreProducts}>
          <button className={style.button} onClick={onClick}>{ title }</button>
      </div>
  );
};

export default Button;

type ButtonPropsType = {
  title: string
  onClick: () => void
}