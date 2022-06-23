import React from 'react';
import { getProductItems } from '../../mocks';
import ProductItem from '../ProductItem/ProductItem';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './PopularProductsBlock.module.scss';

const PopularProductsBlock = () => {

  const productItems = getProductItems()

  return (
    <div className={ style.popularProductsBlock }>
      <div className={ commonStyle.container }>
        <div>
          <h2>Новинки</h2>
        </div>
        <div className={ style.productsList }>
          {
            productItems
              .filter((item, index) => index < 4)
              .map( item =>
              <ProductItem
                key={ item.id }
                img={ item.img[ 0 ] }
                title={ item.title }
                units={ item.units }
                price={ item.price }
              />,
            )
          }
        </div>
      </div>
    </div>
  );
};

export default PopularProductsBlock;