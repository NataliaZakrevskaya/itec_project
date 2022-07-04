import React from 'react';
import basket from '../../Images/basket.svg';
import { OptionType, ProductItemType } from '../../mocks';
import style from './ProductItemForBasket.module.scss';
import Product from '../common/Product/Product';

const ProductItemForBasket = ( { options, name, image, product }: ProductItemForBasketPropsType ) => {

  return (
    <div className={ style.productItemForBasketContainer }>
      <Product product={ product } options={ options } name={ name } image={ image } isForOneClick={false}/>
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