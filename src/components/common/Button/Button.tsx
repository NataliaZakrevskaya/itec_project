import React, { ReactElement } from 'react';
import style from './Button.module.scss';
import { ButtonPropsType } from './types';

const Button = React.memo(( { title, onClick, forBurger }: ButtonPropsType ): ReactElement => {
  return (
    <div className={ forBurger ? `${style.buttonMoreProducts } ${style.forBurger }` : style.buttonMoreProducts }>
      <button className={ style.button } onClick={ onClick }>{ title }</button>
    </div>
  );
});

export default Button;