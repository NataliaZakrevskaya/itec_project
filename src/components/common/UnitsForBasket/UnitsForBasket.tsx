import React from 'react';
import style from '../../../pages/ProductPage/ProductPage.module.scss';
import { OptionType } from '../../../mocks';
import { useDispatch } from 'react-redux';
import { setChosenOptionToProduct } from '../../../redux/reducers/products-reducer';

const UnitsForBasket = ( { option, productId, active }: UnitsForBasketPropsType ) => {
  const dispatch = useDispatch();
  const onUnitClick = () => {
    dispatch( setChosenOptionToProduct( { productId, option } ) );
  };

  return (
    <>
      { !option.partial &&
        <div onClick={ onUnitClick } className={ active ? style.active : style.unit }>
          <p className={ style.option }>{ option.size } { option.units.unit_name }</p>
          <p className={ style.price }>{ option.price } BYN</p>
        </div>
      }
    </>
  );
};

export default UnitsForBasket;

type UnitsForBasketPropsType = {
  option: OptionType,
  productId: number,
  active: boolean,
}