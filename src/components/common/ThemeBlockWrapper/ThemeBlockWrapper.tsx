import { ProductItemType } from '../../../mocks';
import commonStyle from '../../../styles/common/Container.module.scss';
import ProductItem from '../../ProductItem/ProductItem';
import Button from '../Button/Button';
import React from 'react';
import PrevSectionButton from '../prevSectionButton/prevSectionButton';
import NextSectionButton from '../nextSectionButton/nextSectionButton';

const ThemeBlockWrapper = ( {title, onButtonClick, itemsForBlock, blockTheme}: ThemeBlockWrapperPropsType ) => {

  const {block, sectionsBlock, productItem} = blockTheme

  return (
    <div className={ `${commonStyle.block} ${ block }` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>{ title }</h2> {/*//todo меняется в зависимости от выбора типа животного*/}
          <div className={ `${commonStyle.sectionsBlock} ${sectionsBlock}` }>
            <PrevSectionButton onClick={() => alert('prev')}/>
            <NextSectionButton onClick={() => alert('next')}/>
          </div>
        </div>
        <div className={ commonStyle.productsList }>
          {
            itemsForBlock
              .map( (item: ProductItemType) =>
                <ProductItem
                  key={ item.id }
                  id={item.id}
                  image={ item.images[ 0 ].image }
                  name={ item.name }
                  options={ item.options }
                  classNameForDarkItem={productItem}
                  unit={item.unit}
                />,
              )
          }
        </div>
        <Button title={ 'Смотреть больше товаров' } onClick={onButtonClick}/> {/*//todo не отображается, если находится в каталоге*/}
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