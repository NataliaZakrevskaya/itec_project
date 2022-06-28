import React from 'react';
import { routesPathsEnum } from '../../routes/enums';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={style.navBar} >
      <NavLink to={routesPathsEnum.MAIN}>Главная</NavLink>
      <NavLink to={routesPathsEnum.CATALOG}>Каталог</NavLink>
      <a href={'#discounts'}>Акции</a>
      <NavLink to={routesPathsEnum.ARTICLES}>Статьи</NavLink>
    </div>
  );
};

export default Navbar;