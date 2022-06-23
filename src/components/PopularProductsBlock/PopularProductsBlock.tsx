import React from 'react';
import { getProductItems } from '../../mocks';
import ProductItem from '../ProductItem/ProductItem';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './PopularProductsBlock.module.scss';
import prevIcon from '../../Images/prevIcon.svg';
import nextIcon from '../../Images/nextIcon.svg';
import Button from '../common/Button/Button';

const PopularProductsBlock = () => {

  const productItems = getProductItems();

  return (
    <div className={ style.popularProductsBlock }>
      <div className={ commonStyle.container }>
        <div className={ style.navigationInfoBlock }>
          <h2>Новинки</h2>
          <div className={ style.sectionsBlock }>
            <div>
              <img src={ prevIcon } alt="prevIcon"/>
            </div>
            <div>
              <img src={ nextIcon } alt="nextIcon"/>
            </div>
          </div>
        </div>
        <div className={ style.productsList }>
          {
            productItems
              .filter( ( item, index ) => index < 4 )
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
          <Button title={ 'Смотреть больше товаров' }/>
      </div>
    </div>
  );
};

export default PopularProductsBlock;