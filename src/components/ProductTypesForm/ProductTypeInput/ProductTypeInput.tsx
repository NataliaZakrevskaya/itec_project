import React from 'react';

const ProductTypeInput = ( { id, name, isActive, chooseProductType }: ProductTypeInputPropsType ) => {

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
};

export default ProductTypeInput;

type ProductTypeInputPropsType = {
  id: number
  name: string,
  isActive: boolean,
  chooseProductType: ( id: number ) => void
}