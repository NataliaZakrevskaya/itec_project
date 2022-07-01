import React, { ChangeEvent } from 'react';

const ProductTypeInput = ({ name, isActive, onChange }: ProductTypeInputPropsType) => {

  return (
      <label>
        <input type="radio" checked={ isActive } value={name} onChange={onChange}/>
        <span/>
        { name }
      </label>
  );
};

export default ProductTypeInput;

type ProductTypeInputPropsType = {
  name: string,
  isActive: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}