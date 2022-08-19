import React, { ReactElement } from 'react';
import { routesPathsEnum } from '../../../routes/enums';
import { NavLink, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import style from './NavbarForHeader.module.scss';
import { NavbarForHeaderPropsType } from '../types';

const NavbarForHeader = React.memo( ( { forHeaderBurger, closeEditMode }: NavbarForHeaderPropsType ): ReactElement => {

  const navigate = useNavigate();
  const discountLinkHandler = () => {
    forHeaderBurger && closeEditMode();
    navigate( routesPathsEnum.MAIN );
  };

  return (
    <div className={ forHeaderBurger ? style.navigationBarForHeader : style.navigationBar }>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               onClick={ () => closeEditMode() }
               to={ routesPathsEnum.MAIN }>Главная</NavLink>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               onClick={ () => closeEditMode() }
               to={ routesPathsEnum.CATALOG }>Каталог</NavLink>
      <div onClick={ discountLinkHandler } className={ style.scroll }>
        <HashLink to={ '#discountForBasket' } className={ style.anchor }
                  scroll={ ( el ) => el.scrollIntoView( { behavior: 'smooth', block: 'center' } ) }>Акции</HashLink>
      </div>
      <NavLink className={ ( navData ) => navData.isActive ? style.activeLink : '' }
               onClick={ () => closeEditMode() }
               to={ routesPathsEnum.ARTICLES }>Статьи</NavLink>
    </div>
  );
} );

export default NavbarForHeader;