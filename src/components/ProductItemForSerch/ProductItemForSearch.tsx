import React from 'react';
import style from './ProductItemForSearch.module.scss';

const ProductItemForSearch = ( {name, image}: ProductItemForSearchPropsType) => {
  return (
    <div className={style.productItemFroSearch}>
      <img src={image} alt="product"/>
      <p>{name}</p>
    </div>
  );
};

export default ProductItemForSearch;

type ProductItemForSearchPropsType = {
  name: string,
  image: string
}