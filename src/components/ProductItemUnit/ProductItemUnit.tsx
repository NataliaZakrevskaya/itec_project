import React from 'react';
import style from './ProductItemUnit.module.scss';
import { useDispatch } from 'react-redux';
import { OptionType } from '../../mocks';
import { setChosenOptionToProduct } from '../../redux/reducers/products-reducer';
import { location } from '../../enums';
import { setChosenOptionToPopularProduct } from '../../redux/reducers/popularProducts-reducer';
import { setChosenOptionToLatestProduct } from '../../redux/reducers/latestProducts-reducer';

const ProductItemUnit = ( { option, productId, active, from }: ProductItemUnitPropsType ) => {
  const dispatch = useDispatch();

  const onUnitClick = () => {
    if ( from === location.CATALOG ) dispatch( setChosenOptionToProduct( { productId, option } ) );
    if ( from === location.POPULAR_PRODUCTS ) dispatch( setChosenOptionToPopularProduct( { productId, option } ) );
    if ( from === location.LATEST_PRODUCTS ) dispatch( setChosenOptionToLatestProduct( { productId, option } ) );
  };

  return (
    <span onClick={ onUnitClick } className={ active ? style.active : style.oneUnitBlock }>
      { +option.size } { option.units.unit_name }
    </span>
  );
};

export default ProductItemUnit;

type ProductItemUnitPropsType = {
  option: OptionType,
  productId: number,
  active: boolean,
  from: string
}