import React, { useRef } from 'react';
import { routesPathsEnum } from '../../../routes/enums';
import { NavLink, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import style from './NavbarForHeader.module.scss';

const NavbarForHeader = () => {
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
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               to={ routesPathsEnum.MAIN }>Главная</NavLink>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               to={ routesPathsEnum.CATALOG }>Каталог</NavLink>
      <div onClick={ discountLinkHandler } className={ style.scroll }>
        <HashLink to={ '#discounts' } className={ style.anchor } scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Акции</HashLink>
      </div>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               to={ routesPathsEnum.ARTICLES }>Статьи</NavLink>
    </div>
  );
};

export default NavbarForHeader;