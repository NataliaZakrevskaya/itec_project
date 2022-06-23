import React from 'react';
import { UnitType } from '../../mocks';
import ProductItemUnit from '../ProductItemUnit/ProductItemUnit';
import basketIcon from '../../Images/basketIcon.svg';
import style from './ProductItem.module.scss';

const ProductItem = ( { img, title, units, price }: ProductItemPropsType ) => {

  return (
    <div className={style.productItem}>
      <img src={ img } alt={ 'product image' }/>
      <p className={style.title}>{ title }</p>
      <div className={style.unitGroup}>
        { units.map( unit =>
          <ProductItemUnit
            key={ unit.id }
            count={ unit.count }
            name={ unit.name }
          />,
        ) }
      </div>
      <div>
        <p>{ `${ price } BYN` }</p>
        <div>
          <p>+</p>
          <img src={ basketIcon } alt="basketIcon"/>
        </div>
      </div>
      <button>Купить в 1 клик</button>
    </div>
  );
};

export default ProductItem;

type ProductItemPropsType = {
  img: string,
  title: string,
  units: Array<UnitType>,
  price: number
}