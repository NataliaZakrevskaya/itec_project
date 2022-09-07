import React, { ReactElement } from 'react';
import style from './ProductItemForSearch.module.scss';
import { ProductItemForSearchPropsType } from './types';

const ProductItemForSearch = React.memo(( { id, name, image, onClick }: ProductItemForSearchPropsType ): ReactElement => {
  return (
    <div className={ style.productItemForSearch } onClick={ () => onClick( id ) }>
      <img src={ image } loading={'lazy'} alt="product"/>
      <p>{ name }</p>
    </div>
  );
});

export default ProductItemForSearch;