import React from 'react';
import style from './ProductItemUnit.module.scss';

const ProductItemUnit = ({count, unit}: ProductItemUnitPropsType) => {
  return (
    <span onClick={() => alert('отправлять в стор выбранное значение, подтягивать измененную цену')} className={style.oneUnitBlock}>
      {count} {unit}
    </span>
  );
};

export default ProductItemUnit;

type ProductItemUnitPropsType = {
  count: number,
  unit: string
}