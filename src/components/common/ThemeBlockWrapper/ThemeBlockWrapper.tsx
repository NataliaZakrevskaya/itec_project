import { ProductItemType } from '../../../mocks';
import commonStyle from '../../../styles/common/Container.module.scss';
import prevIcon from '../../../Images/prevIcon.svg';
import nextIcon from '../../../Images/nextIcon.svg';
import ProductItem from '../../ProductItem/ProductItem';
import Button from '../Button/Button';
import React from 'react';

const ThemeBlockWrapper = ( {title, onButtonClick, itemsForBlock, blockTheme}: ThemeBlockWrapperPropsType ) => {

  const {productsBlock, sectionsBlock, productItem} = blockTheme

  return (
    <div className={ `${commonStyle.productsBlock} ${ productsBlock }` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>{ title }</h2>
          <div className={ `${commonStyle.sectionsBlock} ${sectionsBlock}` }>
            <div onClick={() => alert('prev')}>
              <img src={ prevIcon } alt="prevIcon"/>
            </div>
            <div  onClick={() => alert('next')}>
              <img src={ nextIcon } alt="nextIcon"/>
            </div>
          </div>
        </div>
        <div className={ commonStyle.productsList }>
          {
            itemsForBlock
              .map( (item: any) =>
                <ProductItem
                  key={ item.id }
                  id={item.id}
                  img={ item.img[ 0 ] }
                  title={ item.title }
                  units={ item.units }
                  price={ item.units[0].price }
                  classNameForDarkItem={productItem}
                />,
              )
          }
        </div>
        <Button title={ 'Смотреть больше товаров' } onClick={onButtonClick}/>
      </div>
    </div>
  );
};

export default ThemeBlockWrapper;

type ThemeBlockWrapperPropsType = {
  title: string,
  onButtonClick: () => void,
  itemsForBlock: Array<ProductItemType>,
  blockTheme: any
}