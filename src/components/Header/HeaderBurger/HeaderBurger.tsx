import React from 'react';
import HeaderLogo from '../../Logo/headerLogo/HeaderLogo';
import style from './HeaderBurger.module.scss';
import SearchInput from '../../SearchInput/SearchInput';
import NavbarForHeader from '../../Navbar/NavbarForHeader/NavbarForHeader';
import BasketLink from '../../BasketLink/BasketLink';

const HeaderBurger = ( { onClickHandler }: any ) => {
  return (
    <div className={ style.navBarContainer }>
      <div className={ style.editModeBlock }>
        <HeaderLogo/>
        <div onClick={ () => onClickHandler() } className={ style.burgerButton }/>
      </div>
      <div className={ style.navBlock }>
        <SearchInput forHeaderBurger={ true }/>
        <NavbarForHeader forHeaderBurger={ true }
                         closeEditMode={ onClickHandler }/>
        <BasketLink forHeaderBurger={ true } onClickHandler={ onClickHandler }/>
      </div>
    </div>
  );
};

export default HeaderBurger;