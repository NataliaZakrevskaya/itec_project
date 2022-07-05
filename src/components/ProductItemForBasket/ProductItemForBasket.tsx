import React from 'react';
import { OptionType } from '../../mocks';
import style from './ProductItemForBasket.module.scss';
import Product from '../common/Product/Product';

const ProductItemForBasket = ( {id, options, unit, name, image }: ProductItemForBasketPropsType ) => {

  return (
    <div className={ style.productItemForBasketContainer }>
      <Product id={id} options={options} name={ name } image={ image } unit={unit} isForModal={false}/>
    </div>
  );
};

export default ProductItemForBasket;

type ProductItemForBasketPropsType = {
  id: number,
  options: Array<OptionType>,
  name: string,
  image: string,
  unit: string
}