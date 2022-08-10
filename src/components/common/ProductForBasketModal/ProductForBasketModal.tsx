import React from 'react';
import { OptionType } from '../../../mocks';
import { stringCutter } from '../../../helpers/stringCutter';
import style from './ProductForBasketModal.module.scss';
import { getPrice } from '../../../helpers/getPrice';

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
        <img src={ image } alt="product"/>
        <p>{ productName }</p>
      </div>
      <div className={ chosenOption.partial ? style.orderInfoPartial : style.orderInfoNotPartial }>
        { chosenOption.partial
          ? <p>{ chosenOption.quantity } кг.</p>
          : <p>{ chosenOption.size } { chosenOption.units.unit_name }</p>
        }
        { !chosenOption.partial && <p>{ countOfProduct } шт.</p> }
        <p className={ !priceWithDiscount ? style.price : style.priceWithDiscount }>{ price } BYN.</p>
        { !!priceWithDiscount && <p className={ style.price }>{ priceWithDiscount } BYN.</p> }
      </div>
    </div>
  );
};

export default ProductForBasketModal;

type ProductForBasketModalPropsType = {
  id: number,
  name: string,
  countOfProduct: number,
  chosenOption: OptionType,
  image: string,
  priceWithDiscount?: number
}