import React, { ChangeEvent, useEffect, useState } from 'react';
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
  changePartialProductSize,
  incrementProductQuantity,
  setProductToBasket,
} from '../../redux/reducers/basket-reducer';
import { setActualPage } from '../../redux/reducers/products-reducer';
import { stringCutter } from '../../helpers/stringCutter';
import { getProductsInBasket } from '../../redux/selectors/basket-selectors';
import { AppDispatch } from '../../redux/store';
import { getProductItems, OptionType, ProductItemType } from '../../mocks';
import { fetchProductTC, setChosenOptionToProduct } from '../../redux/reducers/product-reducer';
import { getProduct } from '../../redux/selectors/product-selector';
import { setProductToState } from '../../redux/reducers/onClickOrder-reducer';
import { setProductToBlock } from '../../redux/reducers/previouslyProducts-reducer';
import { getPreviouslyProduct } from '../../redux/selectors/previouslyProducts-selector';
import { getInfo } from '../../redux/selectors/descriptionShop-selectors';
import { PRODUCT_IMAGE } from '../../constants';
import { getWeightSetValue } from '../../redux/selectors/app-selectors';
import { setWeightSetIsShowed } from '../../redux/reducers/app-reducer';
import { getPrice } from '../../helpers/getPrice';

const ProductPage = React.memo( () => {

  const [ countOfProduct, setCountOfProduct ] = useState<number>( 1 );
  const [ weightSetValue, setWeightSetValue ] = useState<string>( '' );
  const [ weightSetError, setWeightSetError ] = useState<string>( '' );
  const [ priceWithDiscount, setPriceWithDiscount ] = useState<number>( 0 );
  const [ selectImageId, setSelectImageId ] = useState<number>( 0 );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
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
    max_discount,
    brand,
  } = product;
  const nameForNavigationBlock = stringCutter( name, 90 );
  const productsFromBasket = useSelector( getProductsInBasket );
  const previouslyProducts = useSelector( getPreviouslyProduct );
  const weightSetIsShowed = useSelector( getWeightSetValue );
  const { address, metro } = useSelector( getInfo );
  const priceWithDiscountCropped = getPrice( priceWithDiscount );
  const partialOption = options.filter( option => option.partial )[ 0 ];
  const stockBalanceInfo = `Максимальный размер заказа может составить: ${ partialOption ? ( partialOption.stock_balance / 1000 ) : 0 } кг.`;
  const products = getProductItems(); //todo позже приходить будет по апи

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
    setIsOneClickModalActive( false );
  };
  const openOneClickModal = ( product: ProductItemType ) => {
    /*send to state product with correct quantity*/
    const productForOneClickState = product.chosen_option.partial ? product : {...product, chosen_option: { ...chosen_option, quantity: countOfProduct }}
    dispatch( setProductToState( { product: productForOneClickState } ) );
    setCountOfProduct(1);
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
    setProductForBasketModal( null );
  };
  const showDiscount = !!max_discount || !!chosen_option.discount_by_option;
  const openBasketModal = ( product: ProductItemType ) => {
    /*send to state product with correct quantity*/
    const productForBasket = product.chosen_option.partial ? product : {...product, chosen_option: {...chosen_option, quantity: countOfProduct }}
    setProductForBasketModal( productForBasket );
    /*if the basket already has this product, increase its number, if not, add it to the basket*/
    productsFromBasket.every( prod => prod.chosen_option?.id !== product.chosen_option?.id )
      ? dispatch( setProductToBasket( { product: productForBasket } ) )
      : chosen_option.partial ? dispatch( changePartialProductSize( {
        optionId: product.chosen_option.id,
        size: ( chosen_option.size / 1000 ),
      } ) ) : dispatch( incrementProductQuantity( { optionId: product.chosen_option.id, quantity: countOfProduct } ) );
    setIsBasketModalActive( true );
  };
  const onUnitClick = ( option: OptionType ) => {
    dispatch( setWeightSetIsShowed( { status: false } ) );
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
        setWeightSetIsShowed( { status: false } );
      } else setWeightSetError( `К сожалению, в наличие нет указанного количества товара.` );
    }
  };
  const addToPreviouslyProducts = () => {
    if ( !previouslyProducts.length ) {
      dispatch( setProductToBlock( { product } ) );
    } else {
      if ( previouslyProducts.every( prod => prod.id !== product.id ) ) dispatch( setProductToBlock( { product } ) );
    }
  };

  useEffect( () => {
    if ( max_discount && chosen_option.discount_by_option ) {
      if ( max_discount < chosen_option.discount_by_option ) {
        if ( chosen_option.partial ) {
          setPriceWithDiscount( ( +chosen_option.price - ( +chosen_option.price / 100 * chosen_option.discount_by_option ) ) * chosen_option.quantity / 1000 );
        } else setPriceWithDiscount( ( +chosen_option.price - ( +chosen_option.price / 100 * chosen_option.discount_by_option ) ) * chosen_option.quantity );
      } else {
        setPriceWithDiscount( ( +chosen_option.price - ( +chosen_option.price / 100 * max_discount ) ) * chosen_option.quantity );
      }
    }
    if ( max_discount && !chosen_option.discount_by_option ) {
      setPriceWithDiscount( ( +chosen_option.price - ( +chosen_option.price / 100 * max_discount ) ) * chosen_option.quantity );
    }
    if ( !product.max_discount && chosen_option.discount_by_option ) {
      if ( chosen_option.partial ) {
        setPriceWithDiscount( ( +chosen_option.price - ( +chosen_option.price / 100 * chosen_option.discount_by_option ) ) * chosen_option.quantity / 1000 );
      } else setPriceWithDiscount( ( +chosen_option.price - ( +chosen_option.price / 100 * chosen_option.discount_by_option ) ) * chosen_option.quantity );
    } else {
      setPriceWithDiscount( 0 );
    }
  }, [ chosen_option.discount_by_option, chosen_option.price, countOfProduct, max_discount ] );
  useEffect( () => {
    if ( product.id !== productId ) dispatch( fetchProductTC( { productId } ) );
  }, [ productId ] );
  useEffect( () => {
    if ( product.id ) {
      addToPreviouslyProducts();
    }
  }, [ product, addToPreviouslyProducts ] );
  useEffect( () => {
    if ( isBasketModalActive || isOneClickModalActive ) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [ isOneClickModalActive, isBasketModalActive ] );

  return (
    <div className={ style.productPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon"/>
          <p onClick={ () => navigate( routesPathsEnum.CATALOG ) }>Каталог</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon"/>
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
                alt="product" loading={ 'lazy' } className={ style.mainImg }/>
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
                        autoFocus={ weightSetIsShowed }
                        placeholder={ 'Например: 1.2 кг' }
                      />
                      <button onClick={ onApplyButtonClick }>Применить</button>
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
                <img src={ boxIcon } loading={ 'lazy' } alt="boxIcon"/>
              </div>
              <div>
                <h3>Самовывоз</h3>
                <p className={ style.pickUpInfo }>В данный момент товар можно забрать только самовывозом из нашего
                  уютного магазина по адресу:</p>
                <Address address={ address } metro={ metro }/>
              </div>
            </div>
            <div className={ style.orderInfoForPayment }>
              <div>
                <h2 className={ !!priceWithDiscountCropped ? style.priceWithDiscount : style.firstPrice }>
                  { +chosen_option.price * countOfProduct } BYN
                </h2>
                { !!priceWithDiscountCropped &&
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
            <p dangerouslySetInnerHTML={ { __html: description } }/>
            <h3>Ключевые особенности:</h3>
            <div dangerouslySetInnerHTML={ { __html: features } }/>
            <h3>Состав:</h3>
            <div dangerouslySetInnerHTML={ { __html: composition } }/>
          </div>
          <div className={ style.mainAnalysis }>
            <h3>Гарантированный анализ:</h3>
            <div dangerouslySetInnerHTML={ { __html: analysis } }/>
            <h3>Пищевые добавки:</h3>
            <div dangerouslySetInnerHTML={ { __html: additives } }/>
          </div>
        </div>
      </div>
      <div className={ style.productPageButtonWrappers }>
        <PopularProductsBlock fromCatalog={ false }/>
      </div>
      <div className={ style.productPageButtonWithWrappers }>
        <WithThisProductBuyBlock products={ products }/>
      </div>
      <UsefulArticlesBlock/>
      { isOneClickModalActive &&
        <Modal closeModal={ closeOneClickModal }>
          <OneClickOrder
            closeOneClickModal={ closeOneClickModal }
          />
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
