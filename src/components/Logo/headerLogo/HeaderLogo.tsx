import React from 'react';
import style from './HeaderLogo.module.scss';

const HeaderLogo = () => {
  return (
    <div className={ style.logoBlock }>
      <div/>
      <p>Территория <span>ZOO</span></p>
    </div>
  );
};

export default HeaderLogo;