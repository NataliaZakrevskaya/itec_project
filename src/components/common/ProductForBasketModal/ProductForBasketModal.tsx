import React from 'react';
import { OptionType } from '../../../mocks';
import { stringCutter } from '../../../helpers/stringCutter';
import style from './ProductForBasketModal.module.scss';

const ProductForBasketModal = ( { name, chosenOption, image, options }: ProductForBasketModalPropsType ) => {
  const productName = stringCutter( name, 70 );
  return (
    <div className={ style.ProductForBasketModalContainer }>
        <img src={ image } alt="product"/>
      <p>{ productName }</p>
      <p>{ chosenOption ? chosenOption.size : options[ 0 ].size } { chosenOption ? chosenOption.units.unit_name : options[ 0 ].units.unit_name }</p>
      <p>{ chosenOption ? chosenOption.price : options[ 0 ].price } BYN.</p>
    </div>
  );
};

export default ProductForBasketModal;

type ProductForBasketModalPropsType = {
  id: number,
  name: string,
  chosenOption: OptionType | null,
  image: string,
  options: Array<OptionType>
}