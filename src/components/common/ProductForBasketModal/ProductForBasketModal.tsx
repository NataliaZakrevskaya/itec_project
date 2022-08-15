import React from 'react';
import { stringCutter } from '../../../helpers/stringCutter';
import style from './ProductForBasketModal.module.scss';
import { getPrice } from '../../../helpers/getPrice';
import { ProductForBasketModalPropsType } from '../types';

const ProductForBasketModal = ( {
                                  name,
                                  chosenOption,
                                  image,
                                  countOfProduct,
                                  priceWithDiscount,
                                }: ProductForBasketModalPropsType ) => {
  const productName = stringCutter( name, 70 );
  const price = getPrice( +chosenOption.price * countOfProduct );
  return (
    <div className={ style.ProductForBasketModalContainer }>
      <div className={ style.productName }>
        <img src={ image } loading={ 'lazy' } alt="product"/>
        <p>{ productName }</p>
      </div>
      <div className={ chosenOption.partial ? style.orderInfoPartial : style.orderInfoNotPartial }>
        { chosenOption.partial
          ? <p>{ chosenOption.quantity } кг.</p>
          : <p>{ chosenOption.size } { chosenOption.units.unit_name }</p>
        }
        { !chosenOption.partial && <p>{ countOfProduct } шт.</p> }
        { price !== priceWithDiscount &&
          <p className={ !priceWithDiscount ? style.price : style.priceWithDiscount }>{ price } BYN.</p> }
        { !!priceWithDiscount && <p className={ style.price }>{ priceWithDiscount } BYN.</p> }
      </div>
    </div>
  );
};

export default ProductForBasketModal;