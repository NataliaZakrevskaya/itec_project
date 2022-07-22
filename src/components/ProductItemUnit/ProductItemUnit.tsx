import React from 'react';
import style from './ProductItemUnit.module.scss';
import { useDispatch } from 'react-redux';
import { OptionType } from '../../mocks';
import { setChosenOption } from '../../redux/reducers/products-reducer';

const ProductItemUnit = ( { option, productId, active }: ProductItemUnitPropsType ) => {
  const dispatch = useDispatch();

  const onUnitClick = () => {
    dispatch( setChosenOption( { productId, option } ) );
  };
  console.log(active);
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
  active: boolean
}