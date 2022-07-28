import React, { ChangeEvent, useLayoutEffect, useState } from 'react';
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
import OnClickOrder from '../../components/common/modals/OnClickOrder/OnClickOrder';
import { useDispatch, useSelector } from 'react-redux';
import { routesPathsEnum } from '../../routes/enums';
import BasketModal from '../../components/common/modals/BasketModal/BasketModal';
import { removeChosenBrandsId, setChosenBrandId, setChosenBrandsId } from '../../redux/reducers/brands-reducer';
import { incrementProductQuantity, setProductToBasket } from '../../redux/reducers/basket-reducer';
import { ProductItemType, setActualPage, setChosenOptionToProduct } from '../../redux/reducers/products-reducer';
import { stringCutter } from '../../helpers/stringCutter';
import { getProductsInBasket } from '../../redux/selectors/basket-selectors';
import { AppDispatch } from '../../redux/store';
import { OptionType } from '../../mocks';
import { fetchProductTC } from '../../redux/reducers/product-reducer';
import { getProduct } from '../../redux/selectors/product-selector';

const ProductPage = () => {

  const [ countOfProduct, setCountOfProduct ] = useState<number>( 1 );
  const [ weightSetIsShowed, setWeightSetIsShowed ] = useState<boolean>( false );
  const [ weightSetValue, setWeightSetValue ] = useState<string>( '' );
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
  const openOneClickModal = () => {
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
          chosen_option: { ...chosen_option, quantity: countOfProduct },
        },
      } ) )
      : dispatch( incrementProductQuantity( { optionId: product.chosen_option.id, quantity: countOfProduct } ) );
    setIsBasketModalActive( true );
  };
  const onUnitClick = ( option: OptionType ) => {
    setCountOfProduct( 1 );
    dispatch( setChosenOptionToProduct( { productId, option } ) );
  };

  useLayoutEffect( () => {
    dispatch( fetchProductTC( { productId } ) );
  }, [ productId ] );

  return (
    <div className={ style.productPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p onClick={ () => navigate( routesPathsEnum.CATALOG ) }>Каталог</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>{ nameForNavigationBlock }</p>
        </div>
      </div>
      <div className={ style.productInfo }>
        <h2 className={ style.productPageTitle }>{ name }</h2>
        <p
          className={ style.productPageSubTitle }
          onClick={ () => chooseBrand( brand.id ) }
        >Смотреть все товары бренда { brand.name } </p>
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
                { options.filter( option => option.partial ) &&
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
                        placeholder={ 'Например: 1,2 кг' }
                      />
                      <button>Применить</button>
                    </div>
                  </div> }
              </div>
            </div>
            <div className={ style.orderInfo }>
              <div className={ style.orderImageWrapper }>
                <img src={ boxIcon } alt="boxIcon"/>
              </div>
              <div>
                <h3>Самовывоз</h3>
                <p className={ style.pickUpInfo }>В данный момент товар можно забрать только самовывозом из нашего
                  уютного магазина по адресу:</p>
                <Address/>
              </div>
            </div>
            <div className={ style.orderInfoForPayment }>
              <h2>
                { +chosen_option.price * countOfProduct } BYN
              </h2>
              <p>Общий вес: { chosen_option.size * countOfProduct } { chosen_option.units.unit_name }</p>
            </div>
            <div className={ style.basketInterface }>
              <div className={ style.quantityManagementBlock }>
                <div className={ style.basketInterfaceMinus } onClick={ onDecrementBtnClick }>
                  <div/>
                </div>
                <div className={ style.basketInterfaceCount }>{ countOfProduct }</div>
                <div className={ style.basketInterfacePlus } onClick={ onIncrementBtnClick }>
                  <div><span/></div>
                </div>
              </div>
              <div className={ style.basketInterfaceButton }>
                <Button title={ 'Добавить в корзину' } onClick={ () => openBasketModal( product ) }/>
              </div>
              <div className={ style.basketInterfaceOneClickWrapper }>
                <p className={ style.basketInterfaceOneClick } onClick={ openOneClickModal }>Купить в 1
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
            <p dangerouslySetInnerHTML={ { __html: features } }/>
            <h3>Состав:</h3>
            <p dangerouslySetInnerHTML={ { __html: composition } }/>
          </div>
          <div className={ style.mainAnalysis }>
            <h3>Гарантированный анализ:</h3>
            <p dangerouslySetInnerHTML={ { __html: analysis } }/>
            <h3>Пищевые добавки:</h3>
            <p dangerouslySetInnerHTML={ { __html: additives } }/>
          </div>
        </div>
      </div>
      <div className={ style.productPageButtonWrappers }>
        <PopularProductsBlock/>
      </div>
      <div className={ style.productPageButtonWithWrappers }>
        <WithThisProductBuyBlock/>
      </div>
      <UsefulArticlesBlock/>
      { isOneClickModalActive &&
        <Modal closeModal={ closeOneClickModal }>
          <OnClickOrder/>
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
