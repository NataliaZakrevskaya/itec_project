import React from 'react';
import { NavLink } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';
import style from './NavbarForFooter.module.scss';

const NavbarForFooter = () => {
  return (
    <div className={ style.navBar }>
      <NavLink to={ routesPathsEnum.MAIN }>Главная</NavLink>
      <NavLink to={ routesPathsEnum.CATALOG }>Каталог</NavLink>
      <a href={ '#discounts' }>Акции</a>
      <NavLink to={ routesPathsEnum.ARTICLES }>Статьи</NavLink>
    </div>
  );
};

export default NavbarForFooter;