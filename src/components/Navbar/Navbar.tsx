import React from 'react';
import { routesPathsEnum } from '../../routes/enums';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{display: "flex", justifyContent: "space-between", width: 250}}>
      <NavLink to={routesPathsEnum.MAIN}>Главная</NavLink>
      <NavLink to={routesPathsEnum.CATALOG}>Каталог</NavLink>
      <NavLink to={routesPathsEnum.DISCOUNT}>Акции</NavLink>
      <NavLink to={routesPathsEnum.ARTICLES}>Статьи</NavLink>
    </div>
  );
};

export default Navbar;