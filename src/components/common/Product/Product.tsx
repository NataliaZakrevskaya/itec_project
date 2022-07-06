import React, { useState } from 'react';
import style from './Product.module.scss';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import { OptionType } from '../../../mocks';
import basket from '../../../Images/basket.svg';

const Product = ( { id, options, name, image, isForModal, unit }: ProductForBasketPropsType ) => {
  const [ countOfProduct, setCountOfProduct ] = useState( 1 );
  const onDecrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct - 1 );
  };
  const onIncrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct + 1 );
  };
  return (
    <div className={ style.productForBasketContainer }>
      <div className={ style.imageWrapper }>
        <img src={ image } alt="product"/>
      </div>
        <div className={isForModal ? `${style.productMainInfo} ${style.widthForModalMainProductInfo}` : `${style.productMainInfo} ${style.widthForBasketMainProductInfo}`}>
        <h3 className={ style.basketTitle }>
          { name }
        </h3>
        <div className={ style.heftWrapper }>
          {
            options.map( option =>
              <ProductItemUnit
                key={ option.id }
                count={ option.count }
                unit={ unit }
              />,
            )
          }
        </div>
        <p onClick={ () => alert( 'Переход на модалку' ) }>Указать свой вес</p>
      </div>
      <div className={ style.quantityManagementBlockWrapper }>
        <div className={ style.quantityManagementBlock }>
          <div className={ style.minus } onClick={ onDecrementBtnClick }>
            <div/>
          </div>
          <div className={ style.countMeaning }>
            { countOfProduct }
          </div>
          <div className={ style.plus } onClick={ onIncrementBtnClick }>
            <div/>
          </div>
          { !isForModal && <img className={ style.basketImage } src={ basket } alt="basketIcon"/> }
        </div>
        { isForModal &&
          <div>
            <p>235 BYN.</p> {/*//todo позже будет получаться из стора*/ }
          </div>
        }
      </div>
    </div>
  );
};

export default Product;

type ProductForBasketPropsType = {
  id: number,
  options: Array<OptionType>,
  name: string,
  image: string,
  unit: string,
  isForModal: boolean
}