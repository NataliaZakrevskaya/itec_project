import React from 'react';

const ProductTypeInput = ({ id, name, isActive, chooseActiveProductType }: ProductTypeInputPropsType) => {

  return (
      <label>
        <input type="radio" checked={ isActive } value={name} onChange={() => chooseActiveProductType(id)}/>
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
  chooseActiveProductType: (id: number) => void
}