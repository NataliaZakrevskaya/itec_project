import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import style from './ProductPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import { WithThisProductBuyBlock } from '../../components/WithThisProductBuy/WithThisProductBuyBlock';
import nextIcon from '../../Images/nextIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import UnitsForBasket from '../../components/common/UnitsForBasket/UnitsForBasket';
import boxIcon from '../../Images/boxIcon.svg';
import Address from '../../components/common/Address/Address';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/modals/Modal';
import OneClickOrder from '../../components/common/modals/OneClickOrder/OneClickOrder';
import { useDispatch, useSelector } from 'react-redux';
import { routesPathsEnum } from '../../routes/enums';
import BasketModal from '../../components/common/modals/BasketModal/BasketModal';
import { removeChosenBrandsId, setChosenBrandId, setChosenBrandsId } from '../../redux/reducers/brands-reducer';
import {
  changePartialProductQuantity,
  incrementProductQuantity,
  setProductToBasket,
} from '../../redux/reducers/basket-reducer';
import { ProductItemType, setActualPage } from '../../redux/reducers/products-reducer';
import { stringCutter } from '../../helpers/stringCutter';
import { getProductsInBasket } from '../../redux/selectors/basket-selectors';
import { AppDispatch } from '../../redux/store';
import { OptionType } from '../../mocks';
import { fetchProductTC, setChosenOptionToProduct } from '../../redux/reducers/product-reducer';
import { getProduct } from '../../redux/selectors/product-selector';
import { getProductForOneClickOrder } from '../../redux/selectors/oneClickOrder-selectors';
import { setProductToState } from '../../redux/reducers/onClickOrder-reducer';
import { setProductToBlock } from '../../redux/reducers/previouslyProducts-reducer';
import { getPreviouslyProduct } from '../../redux/selectors/previouslyProducts-selector';

const ProductPage = () => {

  const [ countOfProduct, setCountOfProduct ] = useState<number>( 1 );
  const [ weightSetIsShowed, setWeightSetIsShowed ] = useState<boolean>( false );
  const [ weightSetValue, setWeightSetValue ] = useState<string>( '' );
  const [ weightSetError, setWeightSetError ] = useState<string>( '' );
  const [ selectImageId, setSelectImageId ] = useState<number>( 0 );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );

  const productId = Number( useParams().productId );
  const product = useSelector( getProduct );
  const {
    brand,
    name,
    images,
    options,
    description,
    analysis,
    features,
    composition,
    additives,
    chosen_option,
  } = product;
  const nameForNavigationBlock = stringCutter( name, 90 );
  const productForBasket = useSelector( getProductsInBasket );
  const productForBasketModal = productForBasket[ 0 ];
  const productForOneClickOrderModal = useSelector( getProductForOneClickOrder );
  const previouslyProducts = useSelector( getPreviouslyProduct );
  const partialOption = options.filter( option => option.partial )[ 0 ];
  const stockBalanceInfo = `???????????????????????? ???????????? ???????????? ?????????? ??????????????????: ${ partialOption ? ( partialOption.stock_balance / 1000 ) : 0 } ????.`;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const chooseBrand = ( id: number ) => {
    const pageNumber = 1;
    dispatch( removeChosenBrandsId( {} ) );
    dispatch( setChosenBrandId( { id } ) );
    dispatch( setChosenBrandsId( {} ) );
    dispatch( setActualPage( { pageNumber } ) );
    navigate( routesPathsEnum.CATALOG );
  };
  const onDecrementBtnClick = () => {
    if ( countOfProduct > 1 ) {
      setCountOfProduct( () => countOfProduct - 1 );
    }
  };
  const onIncrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct + 1 );
  };
  const onWeightSetInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setWeightSetError( '' );
    setWeightSetValue( e.currentTarget.value );
  };
  const onWeightSetParagraphClick = () => {
    setWeightSetIsShowed( !weightSetIsShowed );
  };
  const selectImage = ( id: number ) => {
    setSelectImageId( id );
  };
  const closeOneClickModal = () => {
    setIsOneClickModalActive( false );
  };
  const openOneClickModal = ( product: ProductItemType ) => {
    dispatch( setProductToState( { product } ) );
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
  };
  const openBasketModal = ( product: ProductItemType ) => {
    productForBasket.every( prod => prod.chosen_option?.id !== product.chosen_option?.id )
      ? dispatch( setProductToBasket( {
        product: {
          ...product,
          chosen_option: {
            ...chosen_option,
            quantity: chosen_option.partial ? ( chosen_option.quantity / 1000 ) : countOfProduct,
          },
        },
      } ) )
      : chosen_option.partial ? dispatch( changePartialProductQuantity( {
        optionId: product.chosen_option.id,
        quantity: ( chosen_option.quantity / 1000 ),
      } ) ) : dispatch( incrementProductQuantity( { optionId: product.chosen_option.id, quantity: countOfProduct } ) );
    setIsBasketModalActive( true );
  };
  const onUnitClick = ( option: OptionType ) => {
    setCountOfProduct( 1 );
    dispatch( setChosenOptionToProduct( { productId, option } ) );
  };
  const onApplyButtonClick = () => {
    if ( partialOption ) {
      if ( +weightSetValue <= ( partialOption.stock_balance / 1000 ) ) {
        const sum = +weightSetValue * +partialOption.price;
        const price = sum.toFixed( 2 );
        dispatch( setChosenOptionToProduct( {
          productId,
          option: { ...partialOption, quantity: +weightSetValue * 1000, price },
        } ) );
        setWeightSetError( '' );
        setWeightSetValue( '' );
        setWeightSetIsShowed( false );
      }
      setWeightSetError( `?? ??????????????????, ?? ?????????????? ?????? ???????????????????? ???????????????????? ????????????.` );
    }
  };
  const addToPreviouslyProducts = () => {
    if ( !previouslyProducts.length ) {
      dispatch( setProductToBlock( { product } ) );
    } else {
      if ( previouslyProducts.every( prod => prod.id !== product.id ) ) dispatch( setProductToBlock( { product } ) );
    }
  };

  useLayoutEffect( () => {
    if ( product.id !== productId ) dispatch( fetchProductTC( { productId } ) );
  }, [ productId ] );

  useEffect( () => {
    if ( product.id ) {
      addToPreviouslyProducts();
    }
  }, [ product ] );

  return (
    <div className={ style.productPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>??????????????</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p onClick={ () => navigate( routesPathsEnum.CATALOG ) }>??????????????</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>{ nameForNavigationBlock }</p>
        </div>
      </div>
      <div className={ style.productInfo }>
        <h2 className={ style.productPageTitle }>{ name }</h2>
        <p
          className={ style.productPageSubTitle }
          onClick={ () => chooseBrand( brand.id ) }
        >???????????????? ?????? ???????????? ???????????? { brand.name } </p>
        <div className={ style.imgAndOrderBlock }>
          <div className={ style.imageBlock }>
            <div className={ style.mainImageWrapper }>
              <img
                src={ images[ selectImageId ] ? images[ selectImageId ].image : 'https://compfixer.info/wp-content/uploads/2014/06/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D0%B8%D0%B3%D0%BD-%D0%BA%D0%B0%D0%B1-Samsung.png' }
                alt="product" className={ style.mainImg }/>
            </div>
            <div className={ style.restImagesBlock }>
              {
                images
                  .map( img =>
                    <img
                      src={ img.image }
                      alt="product"
                      className={ img.id === selectImageId ? `${ style.restImage } ${ style.selectImg }` : style.restImage }
                      onClick={ () => selectImage( img.id ) }
                    />,
                  )
              }
            </div>
          </div>
          <div className={ style.orderBlock }>
            <h3>
              ???????????????? ??????????????. ???????????????? ?????????????? ??????
            </h3>
            <div>
              <div className={ style.unitsGroup }>
                { options.map( option =>
                  <UnitsForBasket
                    key={ option.id }
                    option={ option }
                    active={ chosen_option.id === option.id }
                    onUnitClick={ onUnitClick }
                  />,
                ) }
              </div>
              <div>
                { partialOption &&
                  <p className={ style.unitsGroupHeft } onClick={ onWeightSetParagraphClick }>???????????? ????????
                    ??????</p>
                }
                { weightSetIsShowed &&
                  <div className={ style.setWeightBlock }>
                    <h3>?????????????? ???????? ??????</h3>
                    <div>
                      <input
                        type="text"
                        value={ weightSetValue }
                        onChange={ onWeightSetInputChange }
                        placeholder={ '????????????????: 1.2 ????' }
                      />
                      <button onClick={ onApplyButtonClick }>??????????????????</button>
                    </div>
                    { weightSetError &&
                      <div className={ style.errorContainer }>
                        <span>{ weightSetError }</span>
                        <span>{ stockBalanceInfo }</span>
                      </div> }
                  </div> }
              </div>
            </div>
            <div className={ style.orderInfo }>
              <div className={ style.orderImageWrapper }>
                <img src={ boxIcon } alt="boxIcon"/>
              </div>
              <div>
                <h3>??????????????????</h3>
                <p className={ style.pickUpInfo }>?? ???????????? ???????????? ?????????? ?????????? ?????????????? ???????????? ?????????????????????? ???? ????????????
                  ?????????????? ???????????????? ???? ????????????:</p>
                <Address/>
              </div>
            </div>
            <div className={ style.orderInfoForPayment }>
              <h2>
                { +chosen_option.price * countOfProduct } BYN
              </h2>
              {
                chosen_option.partial
                  ? <p>?????????? ??????: { chosen_option.quantity / 1000 } ????.</p>
                  : <p>?????????? ??????: { chosen_option.size * countOfProduct } { chosen_option.units.unit_name }</p>
              }

            </div>
            <div className={ style.basketInterface }>
              { !chosen_option.partial &&
                <div className={ style.quantityManagementBlock }>
                  <div className={ style.basketInterfaceMinus } onClick={ onDecrementBtnClick }>
                    <div/>
                  </div>
                  <div className={ style.basketInterfaceCount }>{ countOfProduct }</div>
                  <div className={ style.basketInterfacePlus } onClick={ onIncrementBtnClick }>
                    <div><span/></div>
                  </div>
                </div>
              }
              <div className={ style.basketInterfaceButton }>
                <Button title={ '???????????????? ?? ??????????????' } onClick={ () => openBasketModal( product ) }/>
              </div>
              <div className={ style.basketInterfaceOneClickWrapper }>
                <p className={ style.basketInterfaceOneClick } onClick={ () => openOneClickModal( product ) }>???????????? ?? 1
                  ????????</p>
              </div>
            </div>
          </div>
        </div>
        <h2 className={ style.descriptionTitle }>????????????????</h2>
        <div className={ style.descriptionBlock }>
          <div className={ style.mainDescription }>
            <p dangerouslySetInnerHTML={ { __html: description } }/>
            <h3>???????????????? ??????????????????????:</h3>
            <p dangerouslySetInnerHTML={ { __html: features } }/>
            <h3>????????????:</h3>
            <p dangerouslySetInnerHTML={ { __html: composition } }/>
          </div>
          <div className={ style.mainAnalysis }>
            <h3>?????????????????????????????? ????????????:</h3>
            <p dangerouslySetInnerHTML={ { __html: analysis } }/>
            <h3>?????????????? ??????????????:</h3>
            <p dangerouslySetInnerHTML={ { __html: additives } }/>
          </div>
        </div>
      </div>
      <div className={ style.productPageButtonWrappers }>
        <PopularProductsBlock fromCatalog={ false }/>
      </div>
      <div className={ style.productPageButtonWithWrappers }>
        <WithThisProductBuyBlock/>
      </div>
      <UsefulArticlesBlock/>
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
            countOfProduct={ countOfProduct }
            closeModal={ closeBasketModal }
          />
        </Modal>
      }
    </div>
  );
};

export default ProductPage;
