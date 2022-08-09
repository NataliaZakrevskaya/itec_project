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
import { PRODUCT_IMAGE } from '../../../constants';
import { setProductToState } from '../../../redux/reducers/onClickOrder-reducer';
import { getOneClickOrderRequestStatus } from '../../../redux/selectors/app-selectors';
import { RequestStatus } from '../../../redux/reducers/enums';
import SuccessOrderModal from '../modals/SuccessOrderModal/SuccessOrderModal';
import { location } from '../../../enums';
import { setOneClickOrderRequestStatus } from '../../../redux/reducers/app-reducer';

const ThemeBlockWrapper = ( {
                              title,
                              onButtonClick,
                              itemsForBlock,
                              blockTheme,
                              from,
                              withoutButton,
                            }: ThemeBlockWrapperPropsType ) => {

  const [ productForBasketModal, setProductForBasketModal ] = useState<any>( null );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const { block, sectionsBlock, productItem } = blockTheme;
  const productForOneClickOrderModal = useSelector( getProductForOneClickOrder );
  const productsFromBasket = useSelector( getProductsInBasket );
  const isSuccessOneClickOrder = useSelector( getOneClickOrderRequestStatus ) === RequestStatus.SUCCEEDED;

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
  const openOneClickModal = ( product: ProductItemType ) => {
    dispatch( setProductToState( { product } ) );
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
    setProductForBasketModal( null );
  };
  const closeSuccessModal = () => {
    dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.IDLE } ) );
  }

  const openBasketModal = ( product: ProductItemType ) => {
    setProductForBasketModal( product );
    productsFromBasket.every( ( prod: ProductItemType ) => prod.chosen_option?.id !== product.chosen_option?.id )
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
            <div
              className={ commonStyle.allProductItemsContainer }
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
                      image={ item.images[ 0 ] ? item.images[ 0 ].image : `${ PRODUCT_IMAGE }` }
                      name={ item.name }
                      options={ item.options }
                      chosenOption={ item.chosen_option }
                      classNameForDarkItem={ productItem }
                      openOneClickModal={ openOneClickModal }
                      openBasketModal={ openBasketModal }
                      from={ from }
                      forCatalog={false}
                    />,
                  )
              }
            </div>
          </div>
        </div>
        { !withoutButton && <Button title={ 'Смотреть больше товаров' }
                                    onClick={ onButtonClick }/> }
        { isOneClickModalActive && !isSuccessOneClickOrder &&
          <Modal closeModal={ closeOneClickModal }>
            <OneClickOrder
              id={ productForOneClickOrderModal.id }
              name={ productForOneClickOrderModal.name }
              image={ productForOneClickOrderModal.images[ 0 ] ? productForOneClickOrderModal.images[ 0 ].image : `${ PRODUCT_IMAGE }` }
              options={ productForOneClickOrderModal.options }
              chosen_option={ productForOneClickOrderModal.chosen_option }
              closeOneClickModal={closeOneClickModal}
            />
          </Modal>
        }
        { isBasketModalActive &&
          <Modal closeModal={ closeBasketModal }>
            <BasketModal
              key={ productForBasketModal.id }
              id={ productForBasketModal.id }
              image={ productForBasketModal.images[ 0 ] ? productForBasketModal.images[ 0 ].image : `${ PRODUCT_IMAGE }` }
              name={ productForBasketModal.name }
              chosenOption={ productForBasketModal.chosen_option }
              closeModal={ closeBasketModal }
            />
          </Modal>
        }
        { isSuccessOneClickOrder &&
          <Modal closeModal={ closeSuccessModal }>
            <SuccessOrderModal from={location.ONE_CLICK_ORDER}/>
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
  withoutButton?: boolean
}