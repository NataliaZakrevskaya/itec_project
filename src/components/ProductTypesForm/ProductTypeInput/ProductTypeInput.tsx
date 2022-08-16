import React from 'react';
import { ProductTypeInputPropsType } from './types';

const ProductTypeInput = React.memo(( { id, name, isActive, discount, chooseProductType }: ProductTypeInputPropsType ) => {

  return (
    <label>
      <div>
        <input type="radio" checked={ isActive } value={ name } onChange={ () => chooseProductType( id ) }/>
        <span/>
        { name }
      </div>
      { discount && <p>Акция</p> }
    </label>
  );
});

export default ProductTypeInput;