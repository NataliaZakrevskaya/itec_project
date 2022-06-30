import React, { useState } from 'react';
import basket from '../../Images/basket.svg';
import { OptionType, ProductItemType } from '../../mocks';
import ProductItemUnit from '../ProductItemUnit/ProductItemUnit';
import style from './ProductItemForBasket.module.scss';

const ProductItemForBasket = ({options, name, image, product}: ProductItemForBasketPropsType) => {

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
        <img className={style.productItemImg} src={image} alt="product"/>
      </div>
      <div>
        <h3>
          { name }
        </h3>
        <div>
          {
            options.map(option =>
              <ProductItemUnit
                key={option.id}
                count={option.count}
                unit={product.unit}
              />
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
  product: ProductItemType
  options: Array<OptionType>,
  name: string,
  image: string
}