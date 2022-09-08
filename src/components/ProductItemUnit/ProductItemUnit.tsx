import React, { ReactElement } from 'react';
import style from './ProductItemUnit.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenOptionToProduct } from '../../redux/reducers/products';
import { location } from '../../enums';
import { setChosenOptionToPopularProduct } from '../../redux/reducers/popularProducts';
import { setChosenOptionToLatestProduct } from '../../redux/reducers/latestProducts';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { changeChosenOption } from '../../redux/reducers/basket';
import { setChosenOptionToOneOrderProduct } from '../../redux/reducers/onClickOrder';
import { setWeightSetIsShowed } from '../../redux/reducers/app';
import { ProductItemUnitPropsType } from './types';
import { setChosenOptionToPreviouslyProduct } from '../../redux/reducers/previouslyProducts';
import { getDiscountsForBasket } from '../../redux/selectors/discountForBasket';

const ProductItemUnit = ( { option, productId, active, from }: ProductItemUnitPropsType ): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const basketDiscount = useSelector( getDiscountsForBasket )[ 0 ];

  const onUnitClick = () => {
    if ( from === location.CATALOG ) dispatch( setChosenOptionToProduct( { productId, option } ) );
    if ( from === location.POPULAR_PRODUCTS ) dispatch( setChosenOptionToPopularProduct( { productId, option } ) );
    if ( from === location.LATEST_PRODUCTS ) dispatch( setChosenOptionToLatestProduct( { productId, option } ) );
    if ( from === location.BASKET ) dispatch(
      changeChosenOption( { productId, option, basketDiscount } ) );
    if ( from === location.ONE_CLICK_ORDER ) dispatch( setChosenOptionToOneOrderProduct( { option, basketDiscount } ) );
    if ( from === location.PREVIOUSLY_PRODUCTS ) dispatch( setChosenOptionToPreviouslyProduct( {
      productId,
      option,
    } ) );
  };
  const onSetWeightClick = () => {
    dispatch( setWeightSetIsShowed( { status: true } ) );
    document.documentElement.scrollTo( 0, 0 );
    navigate( `${ routesPathsEnum.CATALOG }/${ productId }` );
  };

  return (
    <>
      { !option.partial
        ? ( <span onClick={ onUnitClick } className={ active ? style.active : style.oneUnitBlock }>
      { +option.size } { option.units.unit_name }
    </span> )
        : <span className={ style.oneUnitBlock }
                onClick={ onSetWeightClick }>Задать вес</span> }
    </>
  );
};

export default ProductItemUnit;
