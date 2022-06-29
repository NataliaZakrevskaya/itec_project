import React from 'react';

const UnitsForBasket = ( { size, unit, price }: UnitsForBasketPropsType ) => {
  return (
    <div>
      <p>{ size } { unit }</p>
      <p>{ price }</p>
    </div>
  );
};

export default UnitsForBasket;

type UnitsForBasketPropsType = {
  size: number,
  unit: string
  price: number
}