import React from 'react';
import HeaderLogo from '../../Logo/headerLogo/HeaderLogo';
import style from './HeaderBurger.module.scss';
import SearchInput from '../../SearchInput/SearchInput';
import NavbarForHeader from '../../Navbar/NavbarForHeader/NavbarForHeader';
import BasketLink from '../../BasketLink/BasketLink';
import ProductTypesForm from '../../ProductTypesForm/ProductTypesForm';
import BrandsForm from '../../BrandsForm/BrandsForm';

const HeaderBurger = ( { onClickHandler, forFilters }: HeaderBurgerPropsType ) => {
  return (
    <div className={ style.navBarContainer }>
      <div className={ style.editModeBlock }>
        <HeaderLogo/>
        <div onClick={ () => onClickHandler() } className={ style.burgerButton }/>
      </div>
      {
        forFilters
          ? ( <div className={ style.sortingBlock }>
            <div className={ style.productsType }>
              <ProductTypesForm/>
              <BrandsForm closeEditMode={onClickHandler}/>
            </div>
          </div> )
          : ( <div className={ style.navBlock }>
            <SearchInput forHeaderBurger={ true }/>
            <NavbarForHeader forHeaderBurger={ true }
                             closeEditMode={ onClickHandler }/>
            <BasketLink forHeaderBurger={ true } onClickHandler={ onClickHandler }/>
          </div> )
      }
    </div>
  );
};

export default HeaderBurger;

type HeaderBurgerPropsType = {
  onClickHandler: () => void,
  forFilters: boolean
}