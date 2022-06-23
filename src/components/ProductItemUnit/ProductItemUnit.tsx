import React from 'react';
import style from './ProductItemUnit.module.scss';

const ProductItemUnit = ({count, name}: any) => {
  return (
    <span className={style.oneUnitBlock}>
      {count} {name}
    </span>
  );
};

export default ProductItemUnit;