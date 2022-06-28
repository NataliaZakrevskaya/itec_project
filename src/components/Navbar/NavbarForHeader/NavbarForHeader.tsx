import React from 'react';
import { routesPathsEnum } from '../../../routes/enums';
import { NavLink } from 'react-router-dom';
import style from './NavbarForHeader.module.scss';

const NavbarForHeader = () => {
  return (
    <div className={style.navBar} >
      <NavLink className={(navData) => navData.isActive ? style.activeLink : ""} to={routesPathsEnum.MAIN}>Главная</NavLink>
      <NavLink className={(navData) => navData.isActive ? style.activeLink : ""} to={routesPathsEnum.CATALOG}>Каталог</NavLink>
      <a href={'#discounts'}>Акции</a>
      <NavLink className={(navData) => navData.isActive ? style.activeLink : ""} to={routesPathsEnum.ARTICLES}>Статьи</NavLink>
    </div>
  );
};

export default NavbarForHeader;