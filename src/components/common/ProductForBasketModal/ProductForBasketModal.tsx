import React, { ReactElement } from 'react';
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
                                  showDiscount,
                                }: ProductForBasketModalPropsType ): ReactElement => {
  const productName = stringCutter( name, 70 );
  const price = getPrice( chosenOption.partial ? ( +chosenOption.price * chosenOption.quantity / 1000 ) : ( +chosenOption.price * countOfProduct ) );
  console.log(showDiscount)
  return (
    <div className={ style.ProductForBasketModalContainer }>
      <div className={ style.productName }>
        <img src={ image } loading={ 'lazy' } alt="product" draggable="false"/>
        <p>{ productName }</p>
      </div>
      <div className={ chosenOption.partial ? style.orderInfoPartial : style.orderInfoNotPartial }>
        { chosenOption.partial
          ? <p>{ chosenOption.quantity / 1000 } кг.</p>
          : <p>{ chosenOption.size } { chosenOption.units.unit_name }</p>
        }
        { !chosenOption.partial && <p>{ countOfProduct } шт.</p> }
         <p className={ showDiscount ? style.priceWithDiscount : style.price }>{ price } BYN.</p>
        { !!priceWithDiscount && <p className={ style.price }>{ priceWithDiscount % 1 === 0 ? priceWithDiscount : priceWithDiscount.toFixed(2) } BYN.</p> }
      </div>
    </div>
  );
};

export default ProductForBasketModal;