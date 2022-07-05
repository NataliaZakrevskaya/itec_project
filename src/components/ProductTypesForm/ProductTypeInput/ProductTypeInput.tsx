import React from 'react';

const ProductTypeInput = ({ id, name, isActive, chooseProductType }: ProductTypeInputPropsType) => {

  return (
      <label>
        <input type="radio" checked={ isActive } value={name} onChange={() => chooseProductType(id)}/>
        <span/>
        { name }
      </label>
  );
};

export default ProductTypeInput;

type ProductTypeInputPropsType = {
  id: number
  name: string,
  isActive: boolean,
  chooseProductType: (id: number) => void
}