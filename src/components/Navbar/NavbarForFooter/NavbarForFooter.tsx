import React, { ReactElement, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';
import style from './NavbarForFooter.module.scss';
import { HashLink } from 'react-router-hash-link';

const NavbarForFooter = React.memo( (): ReactElement => {
  const linkRef = useRef( null );
  const navigate = useNavigate();
  const discountLinkHandler = () => {
    navigate( routesPathsEnum.MAIN );
    if ( linkRef ) {
      // @ts-ignore
      linkRef.current.click();
    }
  };
  return (
    <div className={ style.navBar }>
      <NavLink to={ routesPathsEnum.MAIN }>Главная</NavLink>
      <NavLink to={ routesPathsEnum.CATALOG }>Каталог</NavLink>
      <div onClick={ discountLinkHandler } className={ style.scroll }>
        <HashLink to={ '#discountForBasket' } className={ style.anchor }
                  scroll={ ( el ) => el.scrollIntoView( { behavior: 'smooth', block: 'center' } ) }>Акции</HashLink>
      </div>
      <NavLink to={ routesPathsEnum.ARTICLES }>Статьи</NavLink>
    </div>
  );
} );

export default NavbarForFooter;