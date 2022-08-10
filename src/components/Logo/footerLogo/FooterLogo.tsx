import React from 'react';
import logo from '../../../Images/footerLogo.svg';
import style from './FooterLogo.module.scss';

const FooterLogo = () => {
  return (
    <div className={ style.logoBlock }>
      <img src={ logo } alt={ 'logo' }/>
      <p>Территория <span>ZOO</span></p>
    </div>
  );
};

export default FooterLogo;