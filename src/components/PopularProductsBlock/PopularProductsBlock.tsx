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

  const onButtonClick = () => {
    alert('переход на каталог с установленной сортировкой по популярности')
  }

  return (
    <div className={ style.popularProductsBlock }>
      <div className={ commonStyle.container }>
        <div className={ style.navigationInfoBlock }>
          <h2>Популярные товары</h2>
          <div className={ style.sectionsBlock }>
            <div onClick={() => alert('prev')}>
              <img src={ prevIcon } alt="prevIcon"/>
            </div>
            <div  onClick={() => alert('next')}>
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
                  id={item.id}
                  img={ item.img[ 0 ] }
                  title={ item.title }
                  units={ item.units }
                  price={ item.price }
                />,
              )
          }
        </div>
          <Button title={ 'Смотреть больше товаров' } onClick={onButtonClick}/>
      </div>
    </div>
  );
};

export default PopularProductsBlock;