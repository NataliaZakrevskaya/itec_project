import React, { useState } from 'react';
import basket from '../../Images/basket.svg';
import { UnitType } from '../../mocks';
import ProductItemUnit from '../ProductItemUnit/ProductItemUnit';
import style from './ProductItemForBasket.module.scss';

const ProductItemForBasket = ({units, title, img}: ProductItemForBasketPropsType) => {

  const [ countOfProduct, setCountOfProduct ] = useState( 1 );
  const onDecrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct - 1 );
  };
  const onIncrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct + 1 );
  };

  return (
    <div className={style.productItemForBasketContainer}>
      <div>
        <img className={style.productItemImg} src={img} alt="product"/>
      </div>
      <div>
        <h3>
          { title }
        </h3>
        <div>
          {
            units.map(unit =>
              <ProductItemUnit key={unit.id} count={unit.count} name={unit.name}/>
            )
          }
        </div>
        <p onClick={ () => alert( 'Переход на модалку' ) }>Указать свой вес</p>
      </div>
      <div className={ style.quantityManagementBlock }>
        <div onClick={ onDecrementBtnClick }>-</div>
        <div>{ countOfProduct }</div>
        <div onClick={ onIncrementBtnClick }>+</div>
      </div>
        <img src={ basket } alt="basketIcon"/>
    </div>
  );
};

export default ProductItemForBasket;

type ProductItemForBasketPropsType = {
  units: Array<UnitType>,
  title: string,
  img: string
}