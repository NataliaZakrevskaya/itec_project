import React from 'react';
import { ProductTypeInputPropsType } from './types';

const ProductTypeInput = React.memo(( { id, name, isActive, chooseProductType }: ProductTypeInputPropsType ) => {

  const showDiscount = true; //todo заменить после получения инфы от бэка

  return (
    <label>
      <div>
        <input type="radio" checked={ isActive } value={ name } onChange={ () => chooseProductType( id ) }/>
        <span/>
        { name }
      </div>
      { showDiscount && <p>Акция</p> }
    </label>
  );
});

export default ProductTypeInput;