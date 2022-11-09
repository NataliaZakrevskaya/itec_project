import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import style from './ProductPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
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
import { removeChosenBrandsId, setChosenBrandId, setChosenBrandsId } from '../../redux/reducers/brands';
import {
  changePartialProductQuantity,
  incrementProductQuantity,
  setProductToBasket,
} from '../../redux/reducers/basket';
import { setActualPage } from '../../redux/reducers/products';
import { stringCutter } from '../../helpers/stringCutter';
import { getProductsInBasket } from '../../redux/selectors/basket';
import { AppDispatch } from '../../redux/store';
import { fetchProductTC, setChosenOptionToProduct } from '../../redux/reducers/product';
import { getProduct } from '../../redux/selectors/product';
import { setProductToState } from '../../redux/reducers/onClickOrder';
import { setProductToBlock } from '../../redux/reducers/previouslyProducts';
import { getPreviouslyProduct } from '../../redux/selectors/previouslyProducts';
import { getInfo } from '../../redux/selectors/descriptionShop';
import { PRODUCT_IMAGE } from '../../constants';
import { getOneClickOrderRequestStatus, getWeightSetValue } from '../../redux/selectors/app';
import { setOneClickOrderRequestStatus, setWeightSetIsShowed } from '../../redux/reducers/app';
import { getPrice } from '../../helpers/getPrice';
import SuccessOrderModal from '../../components/common/modals/SuccessOrderModal/SuccessOrderModal';
import { location } from '../../enums';
import { RequestStatus } from '../../redux/reducers/enums';
import { OptionType, ProductItemType } from '../../types';
import { getDiscountsForBasket } from '../../redux/selectors/discountForBasket';
import { WithThisProductBuyBlock } from '../../components/WithThisProductBuy/WithThisProductBuyBlock';
import { getAccompanyingProducts } from '../../redux/selectors/accompanyingProducts';
import { fetchAccompanyingProductsTC } from '../../redux/reducers/accompanyingProducts';
import { getPriceWithDiscountForProductPage } from '../../redux/reducers/helpers';
import { fetchArticlesTC } from '../../redux/reducers/articles';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { getArticles } from '../../redux/selectors/articles';

const ProductPage = React.memo( () => {

  const [ countOfProduct, setCountOfProduct ] = useState<number>( 1 );
  const [ weightSetValue, setWeightSetValue ] = useState<string>( '' );
  const [ weightSetError, setWeightSetError ] = useState<string>( '' );
  const [ selectImageId, setSelectImageId ] = useState<number>( 0 );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isOneClickOrderActive, setIsOneClickOrderActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const [ productForBasketModal, setProductForBasketModal ] = useState<any>( null );

  const productId = Number( useParams().productId );
  const product = useSelector( getProduct );
  const {
    name,
    images,
    options,
    description,
    analysis,
    features,
    composition,
    additives,
    chosen_option,
    greatest_discount,
    brand,
  } = product;
  const nameForNavigationBlock = stringCutter( name, 90 );
  const productsFromBasket = useSelector( getProductsInBasket );
  const previouslyProducts = useSelector( getPreviouslyProduct );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const articlesFromStore = useSelector( getArticles );
  const weightSetIsShowed = useSelector( getWeightSetValue );
  const basketDiscount = useSelector( getDiscountsForBasket )[ 0 ];
  const isSuccessOneClickOrder = useSelector( getOneClickOrderRequestStatus ) === RequestStatus.SUCCEEDED;
  const { address, metro } = useSelector( getInfo );
  const accompanyingProducts = useSelector( getAccompanyingProducts );
  const partialOption = options.filter( option => option.partial )[ 0 ];
  const price = getPrice( product.chosen_option.partial ? ( ( product.chosen_option.quantity / 1000 ) * +product.chosen_option.price ) : +product.chosen_option.price * countOfProduct );
  const priceWithDiscountCropped = getPrice( getPriceWithDiscountForProductPage( product ) );
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
    dispatch( setWeightSetIsShowed( { status: !weightSetIsShowed } ) );
  };
  const selectImage = ( id: number ) => {
    setSelectImageId( id );
  };
  const closeOneClickModal = () => {
    dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.IDLE } ) );
    setIsOneClickModalActive( false );
  };
  const closeOneClickOrderModal = () => {
    setIsOneClickOrderActive( true );
  };
  const openOneClickModal = ( product: ProductItemType ) => {
    /*send to state product with correct quantity*/
    const productForOneClickState = product.chosen_option.partial ? product : {
      ...product,
      chosen_option: { ...chosen_option, quantity: countOfProduct },
    };
    dispatch( setProductToState( { product: productForOneClickState, basketDiscount } ) );
    setCountOfProduct( 1 );
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
    setProductForBasketModal( null );
  };
  const showDiscount = !!greatest_discount || !!chosen_option.discount_by_option;
  const openBasketModal = ( product: ProductItemType ) => {
    /*send to state product with correct quantity*/
    const productForBasket = product.chosen_option.partial ? product : {
      ...product,
      chosen_option: { ...chosen_option, quantity: countOfProduct },
    };
    setProductForBasketModal( productForBasket );
    /*if the basket already has this product, increase its number, if not, add it to the basket*/
    productsFromBasket.every( prod => prod.chosen_option?.id !== product.chosen_option?.id )
      ? dispatch( setProductToBasket( { product: productForBasket, basketDiscount } ) )
      : chosen_option.partial ? dispatch( changePartialProductQuantity( {
        optionId: product.chosen_option.id,
        quantity: product.chosen_option.quantity,
        basketDiscount,
      } ) ) : dispatch( incrementProductQuantity( {
        optionId: product.chosen_option.id,
        quantity: countOfProduct,
        basketDiscount,
      } ) );
    setIsBasketModalActive( true );
  };
  const onUnitClick = ( option: OptionType ) => {
    dispatch( setWeightSetIsShowed( { status: false } ) );
    setCountOfProduct( 1 );
    dispatch( setChosenOptionToProduct( { productId, option } ) );
  };
  const onApplyButtonClick = () => {
    if ( /^[0-9]{1,4}(\.[0-9]{1,3})?$/.test( weightSetValue ) ) {
      if ( +weightSetValue < 0.01 ) {
        setWeightSetError( `Минимальный вес заказа должен составлять: 0.01 кг.` );
      } else {
        dispatch( setChosenOptionToProduct( {
          productId,
          option: { ...partialOption, quantity: +weightSetValue * 1000 },
        } ) );
        setWeightSetError( '' );
        setWeightSetValue( '' );
        dispatch( setWeightSetIsShowed( { status: false } ) );
      }
    } else {
      setWeightSetError( `Данные указаны в некорректном формате` );
    }
  };
  const addToPreviouslyProducts = useCallback( () => {
    if ( !previouslyProducts.length ) {
      dispatch( setProductToBlock( { product } ) );
    } else {
      if ( previouslyProducts.every( prod => prod.id !== product.id ) ) dispatch( setProductToBlock( { product } ) );
    }
  }, [ dispatch, previouslyProducts, product ] );
  useEffect( () => {
    if ( product.id !== productId ) dispatch( fetchProductTC( { productId } ) );
  }, [ productId, dispatch, product.id ] );
  useEffect( () => {
    if ( product.id ) {
      addToPreviouslyProducts();
    }
  }, [ product, addToPreviouslyProducts, dispatch ] );
  useEffect( () => {
    dispatch( fetchAccompanyingProductsTC( { productId } ) );
  }, [ productId, dispatch ] );
  useEffect( () => {
    if ( isBasketModalActive || isOneClickModalActive ) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [ isOneClickModalActive, isBasketModalActive, dispatch ] );
  useEffect( () => {
    const chosenAnimalId = chosenAnimalTypeId ? chosenAnimalTypeId : null;
    dispatch( fetchArticlesTC( { chosenAnimalId } ) );
  }, [ dispatch, chosenAnimalTypeId ] );

  return (
    <div className={ style.productPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon" draggable="false"/>
          <p onClick={ () => navigate( routesPathsEnum.CATALOG ) }>Каталог</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon" draggable="false"/>
          <p>{ nameForNavigationBlock }</p>
        </div>
      </div>
      <div className={ style.productInfo }>
        <div className={ style.productInfoTitle }>
          <h2 className={ style.productPageTitle }>{ name }</h2>
          { showDiscount && <div>Акция</div> }
        </div>
        <p
          className={ style.productPageSubTitle }
          onClick={ () => chooseBrand( brand.id ) }
        >Смотреть все товары бренда { brand.name } </p>
        <div className={ style.imgAndOrderBlock }>
          <div className={ style.imageBlock }>
            <div className={ style.mainImageWrapper }>
              <img
                src={ images[ selectImageId ] ? images[ selectImageId ].image : `${ PRODUCT_IMAGE }` }
                alt="product" loading={ 'lazy' } className={ style.mainImg }
                draggable="false"/>
            </div>
            <div className={ style.restImagesBlock }>
              {
                images
                  .map( ( img, index ) =>
                    <img
                      key={ img.id }
                      src={ img.image }
                      alt="product"
                      loading={ 'lazy' }
                      className={ img.id === images[ selectImageId ].id ? `${ style.restImage } ${ style.selectImg }` : style.restImage }
                      onClick={ () => selectImage( index ) }
                      draggable="false"
                    />,
                  )
              }
            </div>
          </div>
          <div className={ style.orderBlock }>
            <h3>
              Варианты фасовки. Выберите удобный вес
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
                  <p className={ style.unitsGroupHeft } onClick={ onWeightSetParagraphClick }>Задать свой
                    вес</p>
                }
                { weightSetIsShowed &&
                  <div className={ style.setWeightBlock }>
                    <h3>Задайте свой вес</h3>
                    <div>
                      <input
                        type="text"
                        value={ weightSetValue }
                        onChange={ onWeightSetInputChange }
                        autoFocus={ true }
                        placeholder={ 'Например: 1.2 кг' }
                      />
                      <button onClick={ onApplyButtonClick }>Применить</button>
                    </div>
                    { weightSetError &&
                      <div className={ style.errorContainer }>
                        <span>{ weightSetError }</span>
                      </div> }
                  </div> }
              </div>
            </div>
            <div className={ style.orderInfo }>
              <div className={ style.orderImageWrapper }>
                <img src={ boxIcon } loading={ 'lazy' } alt="boxIcon" draggable="false"/>
              </div>
              <div>
                <h3>Самовывоз</h3>
                <p className={ style.pickUpInfo }>В данный момент товар можно забрать только самовывозом из нашего
                  уютного магазина по адресу:</p>
                <Address address={ address } metro={ metro } forProductPage={ true }/>
              </div>
            </div>
            <div className={ style.orderInfoForPayment }>
              <div>
                <h2 className={ showDiscount ? style.priceWithDiscount : style.firstPrice }>
                  { price } BYN
                </h2>
                { showDiscount &&
                  <h2 className={ style.discountPrice }>
                    { priceWithDiscountCropped } BYN
                  </h2>
                }
              </div>
              {
                chosen_option.partial
                  ? <p>Общий вес: { chosen_option.quantity / 1000 } кг.</p>
                  : <p>Общий вес: { chosen_option.size * countOfProduct } { chosen_option.units.unit_name }</p>
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
                <Button title={ 'Добавить в корзину' } onClick={ () => openBasketModal( product ) }/>
              </div>
              <div className={ style.basketInterfaceOneClickWrapper }>
                <p className={ style.basketInterfaceOneClick } onClick={ () => openOneClickModal( product ) }>Купить в 1
                  клик</p>
              </div>
            </div>
          </div>
        </div>
        <h2 className={ style.descriptionTitle }>Описание</h2>
        <div className={ style.descriptionBlock }>
          <div className={ style.mainDescription }>
            { !!description && <p dangerouslySetInnerHTML={ { __html: description } }/> }
            { !!features && <h3>Ключевые особенности:</h3> }
            <div dangerouslySetInnerHTML={ { __html: features } }/>
            { !!composition && <h3>Состав:</h3> }
            <div dangerouslySetInnerHTML={ { __html: composition } }/>
          </div>
          <div className={ style.mainAnalysis }>
            { !!analysis && <h3>Гарантированный анализ:</h3> }
            <div dangerouslySetInnerHTML={ { __html: analysis } }/>
            { !!additives && <h3>Пищевые добавки:</h3> }
            <div dangerouslySetInnerHTML={ { __html: additives } }/>
          </div>
        </div>
      </div>
      <div className={ style.productPageButtonWrappers }>
        <PopularProductsBlock fromCatalog={ false }/>
      </div>
      { accompanyingProducts.length > 0 && <div className={ style.productPageButtonWithWrappers }>
        <WithThisProductBuyBlock products={ accompanyingProducts }/>
      </div>
      }
      { !!articlesFromStore.length && <UsefulArticlesBlock/> }
      { isOneClickModalActive &&
        <Modal closeModal={ closeOneClickModal }>
          { isSuccessOneClickOrder
            ? ( <SuccessOrderModal from={ location.ONE_CLICK_ORDER }/> )
            : ( <OneClickOrder closeOneClickOrderModal={ closeOneClickOrderModal } closeModal={ closeOneClickModal }/> )
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
  );
} );

export default ProductPage;
