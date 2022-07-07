import { ProductItemType } from '../../../mocks';
import commonStyle from '../../../styles/common/Container.module.scss';
import ProductItem from '../../ProductItem/ProductItem';
import Button from '../Button/Button';
import React, { useEffect, useRef, useState } from 'react';
import PrevSectionButton from '../prevSectionButton/prevSectionButton';
import NextSectionButton from '../nextSectionButton/nextSectionButton';
import Modal from '../modals/Modal';
import OnClickOrder from '../modals/OnClickOrder/OnClickOrder';
import BasketModal from '../modals/BasketModal/BasketModal';
import { useDispatch } from 'react-redux';
import { setProductToBasket } from '../../../redux/reducers/basket-reducer';

const ThemeBlockWrapper = ( { title, onButtonClick, itemsForBlock, blockTheme }: ThemeBlockWrapperPropsType ) => {

  const [ offset, setOffset ] = useState( 0 );
  const [ width, setWidth ] = useState( 1200 );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const [ isNextDisabled, setIsNextDisabled ] = useState( false );
  const [ isPrevDisabled, setIsPrevDisabled ] = useState( true );

  const windowElRef = useRef( null );
  const { block, sectionsBlock, productItem } = blockTheme;

  const dispatch = useDispatch();

  useEffect( () => {
    const resizeHandler = () => {

      // @ts-ignore
      const _width = windowElRef?.current.offsetWidth;
      setWidth( _width );
      setOffset( 0 );
      setIsPrevDisabled( true );
      setIsNextDisabled( false );
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width ] );

  const onPrevSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset + width + ( width / 100 * 1.8 );
      setIsNextDisabled( false );
      setIsPrevDisabled( 0 < newOffset + width );
      return Math.min( newOffset, 0 );
    } );
  };
  const onNextSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset - width - ( width / 100 * 1.8 );
      const maxOffset = -( width * ( ( itemsForBlock.length / 4 ) - 1 ) + ( width / 100 * 7 ) );
      setIsNextDisabled( maxOffset > newOffset - width );
      setIsPrevDisabled( false );
      return Math.max( newOffset, maxOffset );
    } );
  };
  const closeOneClickModal = () => {
    setIsOneClickModalActive( false );
  };
  const openOneClickModal = () => {
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
  };
  const openBasketModal = (product: ProductItemType) => {
    dispatch(setProductToBasket({product}))
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
          <div className={ commonStyle.window } ref={ windowElRef }>
            <div className={ commonStyle.allProductItemsContainer }
                 style={ {
                   transform: `translateX(${ offset }px)`,
                 } }>
              {
                itemsForBlock
                  .map( ( item: ProductItemType ) =>
                    <ProductItem
                      key={ item.id }
                      product={item}
                      id={ item.id }
                      image={ item.images[ 0 ].image }
                      name={ item.name }
                      options={ item.options }
                      classNameForDarkItem={ productItem }
                      unit={ item.unit }
                      openOneClickModal={ openOneClickModal }
                      openBasketModal={openBasketModal}
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
              key={ itemsForBlock[0].id }
              id={ itemsForBlock[0].id }
              image={ itemsForBlock[0].images[ 0 ].image }
              name={ itemsForBlock[0].name }
              unit={ itemsForBlock[0].unit }
              options={ itemsForBlock[0].options }
              isForModal={ true }
              closeModal={closeBasketModal}
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