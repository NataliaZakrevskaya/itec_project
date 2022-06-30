import React, { useState } from 'react';
import style from './Product.module.scss';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import { OptionType, ProductItemType } from '../../../mocks';

const Product = ( { options, name, image, product, isForOneClick }: ProductForBasketPropsType ) => {
  const [ countOfProduct, setCountOfProduct ] = useState( 1 );
  const onDecrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct - 1 );
  };
  const onIncrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct + 1 );
  };
  return (
    <div className={ style.productForBasketContainer }>
      <div>
        <img className={ style.productItemImg } src={ image } alt="product"/>
      </div>
      <div>
        <h3>
          { name }
        </h3>
        <div>
          {
            options.map( option =>
              <ProductItemUnit
                key={ option.id }
                count={ option.count }
                unit={ product.unit }
              />,
            )
          }
        </div>
        <p onClick={ () => alert( 'Переход на модалку' ) }>Указать свой вес</p>
      </div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <div className={ style.quantityManagementBlock }>
          <div onClick={ onDecrementBtnClick }>-</div>
          <div>{ countOfProduct }</div>
          <div onClick={ onIncrementBtnClick }>+</div>
        </div>
        {isForOneClick &&
          <div>
            <p>235 BYN.</p> {/*//todo позже будет получаться из стора*/}
          </div>
        }
      </div>
    </div>
  );
};

export default Product;

type ProductForBasketPropsType = {
  product: ProductItemType
  options: Array<OptionType>,
  name: string,
  image: string
  isForOneClick: boolean
}