import commonStyle from '../../../styles/common/Container.module.scss';
import ProductItem from '../../ProductItem/ProductItem';
import Button from '../Button/Button';
import React, { useState } from 'react';
import PrevSectionButton from '../prevSectionButton/prevSectionButton';
import NextSectionButton from '../nextSectionButton/nextSectionButton';
import Modal from '../modals/Modal';
import OnClickOrder from '../modals/OnClickOrder/OnClickOrder';
import BasketModal from '../modals/BasketModal/BasketModal';
import { useDispatch } from 'react-redux';
import { setProductToBasket } from '../../../redux/reducers/basket-reducer';
import { ProductItemType } from '../../../redux/reducers/products-reducer';
import { useCarousel } from '../../../customHooks/useCarousel';
import { BlockNames } from '../../../customHooks/enums';

const ThemeBlockWrapper = ( { title, onButtonClick, itemsForBlock, blockTheme }: ThemeBlockWrapperPropsType ) => {

  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const { block, sectionsBlock, productItem } = blockTheme;
  const dispatch = useDispatch();

  const {
    onPrevSectionButtonClick,
    onNextSectionButtonClick,
    isPrevDisabled,
    offset,
    windowElRef,
    isNextDisabled,
    onTouchStart,
    onTouchEnd,
  } = useCarousel( BlockNames.PRODUCTS, itemsForBlock.length);

  const closeOneClickModal = () => {
    setIsOneClickModalActive( false );
  };
  const openOneClickModal = () => {
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
  };
  const openBasketModal = ( product: ProductItemType ) => {
    dispatch( setProductToBasket( { product } ) );
    setIsBasketModalActive( true );
  };

  return (
    <div className={ `${ commonStyle.block } ${ block }` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>{ title }</h2> {/*//todo меняется в зависимости от выбора типа животного*/ }
          <div className={ `${ commonStyle.sectionsBlock } ${ sectionsBlock }` }>
            <PrevSectionButton
              onClick={ onPrevSectionButtonClick }
              disabled={ isPrevDisabled }
            />
            <NextSectionButton
              onClick={ onNextSectionButtonClick }
              disabled={ isNextDisabled }
            />
          </div>
        </div>
        <div className={ commonStyle.itemsContainer }>
          <div
            className={ commonStyle.window }
            ref={ windowElRef }
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className={ commonStyle.allProductItemsContainer }
                 style={ {
                   transform: `translateX(${ offset }px)`,
                 } }>
              {
                itemsForBlock
                  .map( ( item: ProductItemType ) =>
                    <ProductItem
                      key={ item.id }
                      product={ item }
                      id={ item.id }
                      image={ item.images[ 0 ] ? item.images[ 0 ].image : 'https://compfixer.info/wp-content/uploads/2014/06/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D0%B8%D0%B3%D0%BD-%D0%BA%D0%B0%D0%B1-Samsung.png' }
                      name={ item.name }
                      options={ item.options }
                      chosenOption={item.chosen_option}
                      classNameForDarkItem={ productItem }
                      unit={ item.options[0].units.unit_name }
                      openOneClickModal={ openOneClickModal }
                      openBasketModal={ openBasketModal }
                    />,
                  )
              }
            </div>
          </div>
        </div>
        <Button title={ 'Смотреть больше товаров' }
                onClick={ onButtonClick }/> {/*//todo не отображается, если находится в каталоге*/ }
        { isOneClickModalActive &&
          <Modal closeModal={ closeOneClickModal }>
            <OnClickOrder/>
          </Modal>
        }
        { isBasketModalActive &&
          <Modal closeModal={ closeBasketModal }>
            <BasketModal
              key={ itemsForBlock[ 0 ].id }
              id={ itemsForBlock[ 0 ].id }
              image={ itemsForBlock[0].images[ 0 ] ? itemsForBlock[0].images[ 0 ].image : 'https://compfixer.info/wp-content/uploads/2014/06/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D0%B8%D0%B3%D0%BD-%D0%BA%D0%B0%D0%B1-Samsung.png' }
              name={ itemsForBlock[ 0 ].name }
              unit={ itemsForBlock[ 0 ].options[0].units.unit_name }
              options={ itemsForBlock[ 0 ].options }
              chosenOption={itemsForBlock[ 0 ].chosen_option}
              isForModal={ true }
              closeModal={ closeBasketModal }
            />
          </Modal>
        }
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