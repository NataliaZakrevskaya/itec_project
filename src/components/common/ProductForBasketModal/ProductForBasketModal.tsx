import React from 'react';
import { OptionType } from '../../../mocks';
import { stringCutter } from '../../../helpers/stringCutter';
import style from './ProductForBasketModal.module.scss';

const ProductForBasketModal = ( { name, chosenOption, image, countOfProduct }: ProductForBasketModalPropsType ) => {
  const productName = stringCutter( name, 70 );
  return (
    <div className={ style.ProductForBasketModalContainer }>
      <div className={ style.productName }>
        <img src={ image } alt="product"/>
        <p>{ productName }</p>
      </div>
      <div className={style.orderInfo}>
        <p>{ chosenOption.size } { chosenOption.units.unit_name }</p>
        <p>{ countOfProduct } шт.</p>
        <p>{ +chosenOption.price * countOfProduct } BYN.</p>
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
}