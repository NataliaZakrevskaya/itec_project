import commonStyle from '../../../styles/common/Container.module.scss';
import ProductItem from '../../ProductItem/ProductItem';
import Button from '../Button/Button';
import React, { useState } from 'react';
import PrevSectionButton from '../prevSectionButton/prevSectionButton';
import NextSectionButton from '../nextSectionButton/nextSectionButton';
import Modal from '../modals/Modal';
import OneClickOrder from '../modals/OneClickOrder/OneClickOrder';
import BasketModal from '../modals/BasketModal/BasketModal';
import { useDispatch, useSelector } from 'react-redux';
import { incrementProductQuantity, setProductToBasket } from '../../../redux/reducers/basket-reducer';
import { ProductItemType } from '../../../redux/reducers/products-reducer';
import { useCarousel } from '../../../customHooks/useCarousel';
import { BlockNames } from '../../../customHooks/enums';
import { getProductsInBasket } from '../../../redux/selectors/basket-selectors';
import { getProductForOneClickOrder } from '../../../redux/selectors/oneClickOrder-selectors';

const ThemeBlockWrapper = ( { title, onButtonClick, itemsForBlock, blockTheme, from, withButton}: ThemeBlockWrapperPropsType ) => {

  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const { block, sectionsBlock, productItem } = blockTheme;
  const productForBasket = useSelector( getProductsInBasket );
  const productForBasketModal = productForBasket[ 0 ];
  const productForOneClickOrderModal = useSelector( getProductForOneClickOrder );

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
  } = useCarousel( BlockNames.PRODUCTS, itemsForBlock.length );

  const closeOneClickModal = () => {
    setIsOneClickModalActive( false );
  };
  const openOneClickModal = (product: ProductItemType) => {
    dispatch( setProductToBasket( { product } ) );
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
  };
  const openBasketModal = ( product: ProductItemType ) => {
    productForBasket.every( prod => prod.chosen_option?.id !== product.chosen_option?.id )
      ? dispatch( setProductToBasket( { product } ) )
      : dispatch( incrementProductQuantity( { optionId: product.chosen_option.id, quantity: 1 } ) );
    setIsBasketModalActive( true );
  };

  return (
    <div className={ `${ commonStyle.block } ${ block }` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>{ title }</h2>
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
            onTouchStart={ onTouchStart }
            onTouchEnd={ onTouchEnd }
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
                      chosenOption={ item.chosen_option }
                      classNameForDarkItem={ productItem }
                      openOneClickModal={ openOneClickModal }
                      openBasketModal={ openBasketModal }
                      from={ from }
                    />,
                  )
              }
            </div>
          </div>
        </div>
        {withButton && <Button title={ 'Смотреть больше товаров' }
                               onClick={ onButtonClick }/>}
        { isOneClickModalActive &&
          <Modal closeModal={ closeOneClickModal }>
            <OneClickOrder
              id={ productForOneClickOrderModal.id }
              name={ productForOneClickOrderModal.name }
              image={ productForOneClickOrderModal.images[ 0 ].image }
              options={ productForOneClickOrderModal.options }
              chosen_option={ productForOneClickOrderModal.chosen_option }
            />
          </Modal>
        }
        { isBasketModalActive &&
          <Modal closeModal={ closeBasketModal }>
            <BasketModal
              key={ productForBasketModal.id }
              id={ productForBasketModal.id }
              image={ productForBasketModal.images[ 0 ] ? productForBasketModal.images[ 0 ].image : 'https://compfixer.info/wp-content/uploads/2014/06/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D0%B8%D0%B3%D0%BD-%D0%BA%D0%B0%D0%B1-Samsung.png' }
              name={ productForBasketModal.name }
              chosenOption={ productForBasketModal.chosen_option }
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
  blockTheme: any,
  from: string,
  withButton?: boolean
}