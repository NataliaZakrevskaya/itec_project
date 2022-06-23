import React from 'react';
import logo from '../../../Images/headerLogo.svg';
import style from './HeaderLogo.module.scss';

const HeaderLogo = () => {
  return (
    <div className={style.logoBlock}>
      <img src={ logo } alt={ 'logo' }/>
      <p>Территория ZOO</p>
    </div>
  );
};

export default HeaderLogo;