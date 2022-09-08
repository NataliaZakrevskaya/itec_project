import React, { ReactElement } from 'react';
import style from './HeaderLogo.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';

const HeaderLogo = React.memo( (): ReactElement => {
  const navigate = useNavigate();
  const onLogoClick = () => {
    navigate( routesPathsEnum.MAIN );
  };

  return (
    <div className={ style.logoBlock } onClick={ onLogoClick }>
      <div/>
      <p>Территория <span>ZOO</span></p>
    </div>
  );
} );

export default HeaderLogo;