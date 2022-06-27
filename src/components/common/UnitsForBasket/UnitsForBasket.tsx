import React from 'react';

const UnitsForBasket = ( { count, name, price }: UnitsForBasketPropsType ) => {
  return (
    <div>
      <p>{ count } { name }</p>
      <p>{ price }</p>
    </div>
  );
};

export default UnitsForBasket;

type UnitsForBasketPropsType = {
  count: number,
  name: string,
  price: number
}