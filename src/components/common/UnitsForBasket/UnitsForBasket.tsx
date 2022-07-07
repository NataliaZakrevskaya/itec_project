import React from 'react';
import style from '../../../pages/ProductPage/ProductPage.module.scss';

const UnitsForBasket = ( { size, unit, price }: UnitsForBasketPropsType ) => {
  return (
    <div onClick={() => alert('Отправить в стор корзины')}>
      <p className={style.option}>{ size } { unit }</p>
      <p className={style.price}>{ price } BYN</p>
    </div>
  );
};

export default UnitsForBasket;

type UnitsForBasketPropsType = {
  size: number,
  unit: string
  price: number
}