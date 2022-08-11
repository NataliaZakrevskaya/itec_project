import React from 'react';
import style from './HeaderLogo.module.scss';

const HeaderLogo = React.memo(() => {
  return (
    <div className={ style.logoBlock }>
      <div/>
      <p>Территория <span>ZOO</span></p>
    </div>
  );
});

export default HeaderLogo;