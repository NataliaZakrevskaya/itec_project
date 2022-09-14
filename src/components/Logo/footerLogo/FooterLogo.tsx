import React, { ReactElement } from 'react';
import logo from '../../../Images/footerLogo.svg';
import style from './FooterLogo.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';

const FooterLogo = React.memo((): ReactElement => {
  const navigate = useNavigate();
  const onLogoClick = () => {
    navigate( routesPathsEnum.MAIN );
  };
  return (
    <div className={ style.logoBlock } onClick={onLogoClick}>
      <img src={ logo } loading={'lazy'} alt={ 'logo' }/>
      <p>Территория <span>ZOO</span></p>
    </div>
  );
});

export default FooterLogo;