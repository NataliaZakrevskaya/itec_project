import React, { ReactElement } from 'react';
import { routesPathsEnum } from '../../../routes/enums';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './NavbarForHeader.module.scss';
import { NavbarForHeaderPropsType } from '../types';
import { useDispatch } from 'react-redux';
import { setChosenDiscountFilterStatus } from '../../../redux/reducers/discountFilter';

const NavbarForHeader = React.memo( ( { forHeaderBurger, closeEditMode }: NavbarForHeaderPropsType ): ReactElement => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const discountLinkHandler = () => {
    forHeaderBurger && closeEditMode();
    dispatch( setChosenDiscountFilterStatus( { filterStatus: true } ) );
    navigate( routesPathsEnum.CATALOG );
  };

  return (
    <div className={ forHeaderBurger ? style.navigationBarForHeader : style.navigationBar }>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               onClick={ () => closeEditMode() }
               to={ routesPathsEnum.MAIN }>Главная</NavLink>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               onClick={ () => closeEditMode() }
               to={ routesPathsEnum.CATALOG }>Каталог</NavLink>
      <div onClick={ discountLinkHandler } className={ style.anchor }>
        Акции
      </div>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               onClick={ () => closeEditMode() }
               to={ routesPathsEnum.ARTICLES }>Статьи</NavLink>
    </div>
  );
} );

export default NavbarForHeader;