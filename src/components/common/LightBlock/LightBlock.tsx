import { ProductItemType } from '../../../mocks';
import style from '../../PopularProductsBlock/PopularProductsBlock.module.scss';
import commonStyle from '../../../styles/common/Container.module.scss';
import prevIcon from '../../../Images/prevIcon.svg';
import nextIcon from '../../../Images/nextIcon.svg';
import ProductItem from '../../ProductItem/ProductItem';
import Button from '../Button/Button';
import React from 'react';

const LightBlock = ({title, onButtonClick, onPrevButtonClick, onNextButtonClick, itemsForBlock}: LightBlockPropsType) => {

/*
  const onButtonClick = () => {
    alert('переход на каталог с установленной сортировкой по популярности')
  }*/

  return (
    <div className={ style.popularProductsBlock }>
      <div className={ commonStyle.container }>
        <div className={ style.navigationInfoBlock }>
          <h2>{ title }</h2>
          <div className={ style.sectionsBlock }>
            <div onClick={onPrevButtonClick}>
              <img src={ prevIcon } alt="prevIcon"/>
            </div>
            <div  onClick={onNextButtonClick}>
              <img src={ nextIcon } alt="nextIcon"/>
            </div>
          </div>
        </div>
        <div className={ style.productsList }>
          {
            itemsForBlock
              .map( (item: any) =>
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

type LightBlockPropsType = {
  title: string,
  onButtonClick: () => void,
  onPrevButtonClick: () => void,
  onNextButtonClick: () => void,
  itemsForBlock: Array<ProductItemType>
}