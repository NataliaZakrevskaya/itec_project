import React from 'react';
import style from './ProductItemUnit.module.scss';

const ProductItemUnit = ({count, name}: ProductItemUnitPropsType) => {
  return (
    <span onClick={() => alert('отправлять в стор выбранное значение, подтягивать измененную цену')} className={style.oneUnitBlock}>
      {count} {name}
    </span>
  );
};

export default ProductItemUnit;

type ProductItemUnitPropsType = {
  count: number,
  name: string
}