import React, { useRef } from 'react';
import { routesPathsEnum } from '../../../routes/enums';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './NavbarForHeader.module.scss';

const NavbarForHeader = () => {
  const linkRef = useRef(null)
  const navigate = useNavigate()
  const discountLinkHandler = () => {
    navigate(routesPathsEnum.MAIN)
    if(linkRef){
      // @ts-ignore
      linkRef.current.click()
    }
  }
  return (
    <div className={ style.navBar }>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               to={ routesPathsEnum.MAIN }>Главная</NavLink>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               to={ routesPathsEnum.CATALOG }>Каталог</NavLink>
      <div onClick={discountLinkHandler} className={style.scroll}>
        <a ref={linkRef} href={ '#discounts' } className={style.anchor}>Акции</a>
      </div>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               to={ routesPathsEnum.ARTICLES }>Статьи</NavLink>
    </div>
  );
};

export default NavbarForHeader;