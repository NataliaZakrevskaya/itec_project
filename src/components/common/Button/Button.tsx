import React from 'react';
import style from './Button.module.scss';
import { ButtonPropsType } from './types';

const Button = React.memo(( { title, onClick }: ButtonPropsType ) => {
  return (
    <div className={ style.buttonMoreProducts }>
      <button className={ style.button } onClick={ onClick }>{ title }</button>
    </div>
  );
});

export default Button;