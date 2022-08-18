import React, { ReactElement } from 'react';
import logo from '../../../Images/footerLogo.svg';
import style from './FooterLogo.module.scss';

const FooterLogo = React.memo((): ReactElement => {
  return (
    <div className={ style.logoBlock }>
      <img src={ logo } loading={'lazy'} alt={ 'logo' }/>
      <p>Территория <span>ZOO</span></p>
    </div>
  );
});

export default FooterLogo;