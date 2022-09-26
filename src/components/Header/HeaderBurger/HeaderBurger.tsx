import React, { ReactElement } from 'react';
import HeaderLogo from '../../Logo/headerLogo/HeaderLogo';
import style from './HeaderBurger.module.scss';
import SearchInput from '../../SearchInput/SearchInput';
import NavbarForHeader from '../../Navbar/NavbarForHeader/NavbarForHeader';
import BasketLink from '../../BasketLink/BasketLink';
import ProductTypesForm from '../../ProductTypesForm/ProductTypesForm';
import BrandsForm from '../../BrandsForm/BrandsForm';
import { HeaderBurgerPropsType } from '../types';

const HeaderBurger = React.memo(( { onClickHandler, forFilters }: HeaderBurgerPropsType ): ReactElement => {
  return (
    <header className={ style.navBarContainer }>
      <div className={ style.editModeBlock }>
        <HeaderLogo/>
        <div onClick={ () => onClickHandler() } className={ style.burgerButton }/>
      </div>
      {
        forFilters
          ? ( <div className={ style.sortingBlock }>
            <div className={ style.productsType }>
              <ProductTypesForm/>
              <BrandsForm closeEditMode={ onClickHandler }/>
            </div>
          </div> )
          : ( <div className={ style.navBlock }>
            <SearchInput forHeaderBurger={ true } closeBurgerNuv={onClickHandler}/>
            <NavbarForHeader forHeaderBurger={ true }
                             closeEditMode={ onClickHandler }/>
            <BasketLink forHeaderBurger={ true } onClickHandler={ onClickHandler }/>
          </div> )
      }
    </header>
  );
});

export default HeaderBurger;