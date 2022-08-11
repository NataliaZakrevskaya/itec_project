import React from 'react';
import style from './ProductItemForSearch.module.scss';
import { ProductItemForSearchPropsType } from './types';

const ProductItemForSearch = React.memo(( { id, name, image, onClick }: ProductItemForSearchPropsType ) => {
  return (
    <div className={ style.productItemFroSearch } onClick={ () => onClick( id ) }>
      <img src={ image } loading={'lazy'} alt="product"/>
      <p>{ name }</p>
    </div>
  );
});

export default ProductItemForSearch;