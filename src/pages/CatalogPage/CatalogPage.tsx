import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import nextIcon from '../../Images/nextIcon.svg';
import style from './CatalogPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import themeStyle from '../../styles/common/DarkBlock.module.scss';
import AnimalsTypesList from '../../components/AnimalsTypesList/AnimalsTypesList';
import ProductTypesForm from '../../components/ProductTypesForm/ProductTypesForm';
import BrandsForm from '../../components/BrandsForm/BrandsForm';
import ProductItem from '../../components/ProductItem/ProductItem';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import ProductsBlockPagination from '../../components/ProductsBlockPagination/ProductsBlockPagination';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { getTitleForProductsBlock } from '../../helpers/getTitle';
import Modal from '../../components/common/modals/Modal';
import OneClickOrder from '../../components/common/modals/OneClickOrder/OneClickOrder';
import BasketModal from '../../components/common/modals/BasketModal/BasketModal';
import sadCat from '../../Images/sadCat.svg';
import filterMajor from '../../Images/filter_major.svg';
import { removeChosenBrandsId } from '../../redux/reducers/brands';
import { removeChosenProductTypeId } from '../../redux/reducers/productTypes';
import { removeChosenAnimalTypeId } from '../../redux/reducers/animalTypes';
import { incrementProductQuantity, setProductToBasket } from '../../redux/reducers/basket';
import { fetchProductsTC, setActualPage } from '../../redux/reducers/products';
import { getActualPage, getPageSize, getProductItems, getTotalProductsCount } from '../../redux/selectors/products';
import { routesPathsEnum } from '../../routes/enums';
import { useNavigate } from 'react-router-dom';
import { getChosenProductTypeId } from '../../redux/selectors/productTypes';
import { getOneClickOrderRequestStatus, getProductRequestStatus } from '../../redux/selectors/app';
import { RequestStatus } from '../../redux/reducers/enums';
import { setOneClickOrderRequestStatus, setProductRequest } from '../../redux/reducers/app';
import { SelectValuesTypes } from '../../Api/productsApi';
import { getChosenBrandsId } from '../../redux/selectors/brands';
import { location, selectValues } from '../../enums';
import { getProductsInBasket } from '../../redux/selectors/basket';
import { AppDispatch } from '../../redux/store';
import { setProductToState } from '../../redux/reducers/onClickOrder';
import SuccessOrderModal from '../../components/common/modals/SuccessOrderModal/SuccessOrderModal';
import { getChosenOrdering } from '../../redux/selectors/ordering';
import { setChosenOrdering } from '../../redux/reducers/ordering';
import { useResize } from '../../customHooks/useResize';
import { PRODUCT_IMAGE } from '../../constants';
import { CatalogPagePropsType } from './types';
import { ProductItemType } from '../../types';
import { getDiscountsForBasket } from '../../redux/selectors/discountForBasket';
import { getDiscountFilterStatus } from '../../redux/selectors/discountFilter';
import { setChosenDiscountFilterStatus } from '../../redux/reducers/discountFilter';
import ChooseAnimalTypeForm from '../../components/ChooseAnimalTypeForm/ChooseAnimalTypeForm';

const CatalogPage = ( { openFiltersMode, closeEditMode }: CatalogPagePropsType ) => {

  const products = useSelector( getProductItems );
  const animal = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( animal );
  const page = useSelector( getActualPage );
  const totalProductsCount = useSelector( getTotalProductsCount );
  const basketDiscount = useSelector( getDiscountsForBasket )[ 0 ];
  const pageSize = useSelector( getPageSize );
  const category = useSelector( getChosenProductTypeId );
  const isRejectResponse = useSelector( getProductRequestStatus ) === RequestStatus.FAILED;
  const isSuccessOneClickOrder = useSelector( getOneClickOrderRequestStatus ) === RequestStatus.SUCCEEDED;
  const discountFilterStatus = useSelector( getDiscountFilterStatus );
  const [ isOneClickOrderActive, setIsOneClickOrderActive ] = useState<boolean>( false );
  const chosenBrands = useSelector( getChosenBrandsId );
  const chosenOrdering = useSelector( getChosenOrdering );
  const productsFromBasket = useSelector( getProductsInBasket );
  const windowElRef = useRef( null );
  const { width } = useResize( windowElRef );
  const withWords = width > 450;

  const [ productForBasketModal, setProductForBasketModal ] = useState<any>( null );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onPageChanged = useCallback( ( pageNumber: number ) => {
    dispatch( setActualPage( { pageNumber } ) );
  }, [ dispatch ] );
  const closeOneClickModal = () => {
    dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.IDLE } ) );
    setIsOneClickModalActive( false );
  };
  const closeOneClickOrderModal = () => {
    setIsOneClickOrderActive( true );
  };
  const openOneClickModal = ( product: ProductItemType ) => {
    dispatch( setProductToState( { product, basketDiscount } ) );
    setIsOneClickModalActive( true );
  };
  const closeBasketModal = () => {
    setIsBasketModalActive( false );
    setProductForBasketModal( null );
  };
  const openBasketModal = ( product: ProductItemType ) => {
    setProductForBasketModal( product );
    /*check basket for the presence of this product with the selected option by the article of the option. If there is one, increase the quantity of the product at the selected option, if the product is new, add to the basket*/
    productsFromBasket.every( ( prod: ProductItemType ) => prod.chosen_option?.article_number !== product.chosen_option?.article_number )
      ? dispatch( setProductToBasket( { product, basketDiscount } ) )
      : dispatch( incrementProductQuantity( { optionId: product.chosen_option.id, quantity: 1, basketDiscount } ) );
    setIsBasketModalActive( true );
  };
  const resetFilters = () => {
    dispatch( removeChosenBrandsId( {} ) );
    dispatch( removeChosenProductTypeId( {} ) );
    dispatch( removeChosenAnimalTypeId( {} ) );
    dispatch( setProductRequest( { status: RequestStatus.IDLE } ) );
  };
  const chooseOption = ( e: ChangeEvent<HTMLSelectElement> ) => {
    /*set chosen value for select for sorting products*/
    dispatch( setChosenOrdering( { ordering: e.currentTarget.value as SelectValuesTypes } ) );
  };
  const setDiscountFilterStatusFalse = () => {
    dispatch( setChosenDiscountFilterStatus( { filterStatus: false } ) );
  };
  const setDiscountFilterStatusTrue = () => {
    dispatch( setChosenDiscountFilterStatus( { filterStatus: true } ) );
  };

  useEffect( () => {
    const brands = !!chosenBrands.length ? chosenBrands?.join() : null; // we don't add brands to the params unless one of them is selected
    dispatch( fetchProductsTC( { page, animal, category, ordering: chosenOrdering, brands } ) );
  }, [ page, animal, category, chosenOrdering, chosenBrands, dispatch ] );
  useEffect( () => {
    /*we turn off scroll when modals are active*/
    if ( isBasketModalActive || isOneClickModalActive || isSuccessOneClickOrder ) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [ isOneClickModalActive, isBasketModalActive, isSuccessOneClickOrder ] );

  return (
    <div
      className={ style.catalogPageBlock }
    >
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon" draggable="false"/>
          <p>Каталог</p>
        </div>
      </div>
      <AnimalsTypesList/>
      <div className={ style.title }>
        <h1>{ `Каталог товаров ${ subTitle }` }</h1>
        <div className={ style.select }>
          <p>Сортировать по: </p>
          <select
            name="select"
            value={ chosenOrdering }
            onChange={ chooseOption }>
            <option value={ selectValues.POPULARITY }>популярности
            </option>
            <option value={ selectValues.NAME_POSITIVE }>названию: «от А до Я»
            </option>
            <option value={ selectValues.NAME_NEGATIVE }>названию: «от Я до А»
            </option>
            <option value={ selectValues.PRICE_POSITIVE }>цене по возр.
            </option>
            <option value={ selectValues.PRICE_NEGATIVE }>цене по убыв.
            </option>
            <option value={ selectValues.ADDED_DATE }>новизне
            </option>
          </select>
        </div>
        <div onClick={ openFiltersMode } className={ style.catalogFilter }>
          <img className={ style.catalogFilterImage } loading={ 'lazy' } src={ filterMajor } alt="" draggable="false"/>
          <div className={ style.catalogFilterText }>
            Фильтры
          </div>
        </div>
      </div>
      <div className={ style.mainBlock }>
        <div className={ style.sortingBlock }>
          <div className={ style.productsType }>
            <div className={ style.discountBlock }>
              <label>
                <div>
                  <input type="checkbox" checked={ discountFilterStatus } onChange={ () => false }/>
                  { discountFilterStatus
                    ? <div onClick={ setDiscountFilterStatusFalse }><span/>Только акционные товары</div>
                    : <div onClick={ setDiscountFilterStatusTrue }><span/>Только акционные товары</div>
                  }
                </div>
              </label>
            </div>
            { animal ? <ProductTypesForm forBurger={ false }/> : <ChooseAnimalTypeForm forBurger={ false }/> }
            <BrandsForm closeEditMode={ closeEditMode } forBurger={ false }/>
          </div>
        </div>
        <div className={ style.productsBlockContainer }>
          { !isRejectResponse
            ? ( <div
              className={ style.productsBlock }
              ref={ windowElRef }>
              {
                products.map( ( item: ProductItemType ) =>
                  <ProductItem
                    key={ item.id }
                    product={ item }
                    id={ item.id }
                    image={ item.images[ 0 ] ? item.images[ 0 ].image : `${ PRODUCT_IMAGE }` }
                    name={ item.name }
                    options={ item.options }
                    chosenOption={ item.chosen_option }
                    classNameForDarkItem={ themeStyle.productItem }
                    openOneClickModal={ openOneClickModal }
                    openBasketModal={ openBasketModal }
                    from={ location.CATALOG }
                    forCatalog={ true }
                  />,
                )
              }
              <ProductsBlockPagination
                totalProductsCount={ totalProductsCount }
                pageSize={ pageSize }
                actualPage={ page }
                onPageChanged={ onPageChanged }
                withWords={ withWords }
              />
            </div> )
            : ( <div className={ style.emptyCatalog }>
              <img src={ sadCat } loading={ 'lazy' } alt="sadCat" draggable="false"/>
              <div className={ style.title }>
                <h3>По вашему запросу ничего не найдено. Сбросьте фильтр и попробуйте снова</h3>
              </div>
              <button onClick={ resetFilters }>Сбросить фильтры</button>
            </div> )
          }

        </div>
      </div>
      <div className={ style.catalogPopularProductsWrapper }>
        <PopularProductsBlock fromCatalog={ true }/>
      </div>
      <UsefulArticlesBlock/>
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
};

export default CatalogPage;