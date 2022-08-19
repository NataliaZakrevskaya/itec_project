import commonStyle from '../../../styles/common/Container.module.scss';
import ProductItem from '../../ProductItem/ProductItem';
import Button from '../Button/Button';
import React, { ReactElement, useEffect, useState } from 'react';
import PrevSectionButton from '../prevSectionButton/prevSectionButton';
import NextSectionButton from '../nextSectionButton/nextSectionButton';
import Modal from '../modals/Modal';
import OneClickOrder from '../modals/OneClickOrder/OneClickOrder';
import BasketModal from '../modals/BasketModal/BasketModal';
import { useDispatch, useSelector } from 'react-redux';
import { incrementProductQuantity, setProductToBasket } from '../../../redux/reducers/basket';
import { useCarousel } from '../../../customHooks/useCarousel';
import { BlockNames } from '../../../customHooks/enums';
import { getProductsInBasket } from '../../../redux/selectors/basket';
import { PRODUCT_IMAGE } from '../../../constants';
import { setProductToState } from '../../../redux/reducers/onClickOrder';
import { getOneClickOrderRequestStatus } from '../../../redux/selectors/app';
import { RequestStatus } from '../../../redux/reducers/enums';
import SuccessOrderModal from '../modals/SuccessOrderModal/SuccessOrderModal';
import { location } from '../../../enums';
import { setOneClickOrderRequestStatus } from '../../../redux/reducers/app';
import { ThemeBlockWrapperPropsType } from '../types';
import { ProductItemType } from '../../../types';
import { getDiscountsForBasket } from '../../../redux/selectors/discountForBasket';

const ThemeBlockWrapper = ( {
                              title,
                              onButtonClick,
                              itemsForBlock,
                              blockTheme,
                              from,
                              withoutButton,
                            }: ThemeBlockWrapperPropsType ): ReactElement => {

  const [ productForBasketModal, setProductForBasketModal ] = useState<any>( null );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isOneClickOrderActive, setIsOneClickOrderActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const productsFromBasket = useSelector( getProductsInBasket );
  const basketDiscount = useSelector( getDiscountsForBasket )[0];
  const isSuccessOneClickOrder = useSelector( getOneClickOrderRequestStatus ) === RequestStatus.SUCCEEDED;
  const { block, sectionsBlock, productItem } = blockTheme;

  const dispatch = useDispatch();

  useEffect( () => {
    if ( isBasketModalActive || isOneClickModalActive ) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [ isOneClickModalActive, isBasketModalActive ] );

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
    dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.IDLE } ) );
    setIsOneClickModalActive( false );
  };
  const closeOneClickOrderModal = () => {
    setIsOneClickOrderActive( true );
  };
  const openOneClickModal = ( product: ProductItemType ) => {
    dispatch( setProductToState( { product } ) );
    setIsOneClickModalActive( true );
    setIsOneClickOrderActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
    setProductForBasketModal( null );
  };
  const openBasketModal = ( product: ProductItemType ) => {
    setProductForBasketModal( product );
    productsFromBasket.every( ( prod: ProductItemType ) => prod.chosen_option?.id !== product.chosen_option?.id )
      ? dispatch( setProductToBasket( { product, basketDiscount } ) )
      : dispatch( incrementProductQuantity( { optionId: product.chosen_option.id, quantity: 1, basketDiscount } ) );
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
                      forCatalog={ false }
                    />,
                  )
              }
            </div>
          </div>
        </div>
        { !withoutButton && <Button title={ 'Смотреть больше товаров' }
                                    onClick={ onButtonClick }/> }
        { isOneClickModalActive &&
          <Modal closeModal={ closeOneClickModal }>
            { isSuccessOneClickOrder
              ? ( <SuccessOrderModal from={ location.ONE_CLICK_ORDER }/> )
              : ( <OneClickOrder closeOneClickOrderModal={ closeOneClickOrderModal }/> )
            }
          </Modal>
        }
        { isBasketModalActive &&
          <Modal closeModal={ closeBasketModal }>
            <BasketModal
              key={ productForBasketModal.id }
              product={ productForBasketModal }
              closeModal={ closeBasketModal }
            />
          </Modal>
        }
      </div>
    </div>
  );
};

export default ThemeBlockWrapper;