import React, { ReactElement } from 'react';
import HeaderLogo from '../../Logo/headerLogo/HeaderLogo';
import style from './HeaderBurger.module.scss';
import SearchInput from '../../SearchInput/SearchInput';
import NavbarForHeader from '../../Navbar/NavbarForHeader/NavbarForHeader';
import BasketLink from '../../BasketLink/BasketLink';
import ProductTypesForm from '../../ProductTypesForm/ProductTypesForm';
import BrandsForm from '../../BrandsForm/BrandsForm';
import { HeaderBurgerPropsType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountFilterStatus } from '../../../redux/selectors/discountFilter';
import { setChosenDiscountFilterStatus } from '../../../redux/reducers/discountFilter';
import { AppDispatch } from '../../../redux/store';

const HeaderBurger = React.memo( ( { onClickHandler, forFilters }: HeaderBurgerPropsType ): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const discountFilterStatus = useSelector( getDiscountFilterStatus );
  const setDiscountFilterStatusFalse = () => {
    dispatch( setChosenDiscountFilterStatus( { filterStatus: false } ) );
  };
  const setDiscountFilterStatusTrue = () => {
    dispatch( setChosenDiscountFilterStatus( { filterStatus: true } ) );
  };
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
                <label>
                  <div>
                    <input type="checkbox" checked={ discountFilterStatus } onChange={ () => false }/>
                    { discountFilterStatus
                      ? <div onClick={ setDiscountFilterStatusFalse }><span/>Только акционные товары</div>
                      : <div onClick={ setDiscountFilterStatusTrue }><span/>Только акционные товары</div>
                    }
                  </div>
                </label>
              <div className={style.nextSection}/>
              <ProductTypesForm forBurger={true}/>
              <div className={style.nextSection}/>
              <BrandsForm closeEditMode={ onClickHandler } forBurger={true}/>
            </div>
          </div> )
          : ( <div className={ style.navBlock }>
            <SearchInput forHeaderBurger={ true } closeBurgerNuv={ onClickHandler }/>
            <NavbarForHeader forHeaderBurger={ true }
                             closeEditMode={ onClickHandler }/>
            <BasketLink forHeaderBurger={ true } onClickHandler={ onClickHandler }/>
          </div> )
      }
    </header>
  );
} );

export default HeaderBurger;