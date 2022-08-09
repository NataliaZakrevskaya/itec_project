import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getTitleForProductsBlock } from '../../helpers/getTitle';
import Modal from '../../components/common/modals/Modal';
import OneClickOrder from '../../components/common/modals/OneClickOrder/OneClickOrder';
import BasketModal from '../../components/common/modals/BasketModal/BasketModal';
import sadCat from '../../Images/sadCat.svg';
import filterMajor from '../../Images/filter_major.svg';
import { removeChosenBrandsId } from '../../redux/reducers/brands-reducer';
import { removeChosenProductTypeId } from '../../redux/reducers/productTypes-reducer';
import { removeChosenAnimalTypeId } from '../../redux/reducers/animalTypes-reducer';
import { incrementProductQuantity, setProductToBasket } from '../../redux/reducers/basket-reducer';
import { fetchProductsTC, ProductItemType, setActualPage } from '../../redux/reducers/products-reducer';
import {
  getActualPage,
  getPageSize,
  getProductItems,
  getTotalProductsCount,
} from '../../redux/selectors/products-selectors';
import { routesPathsEnum } from '../../routes/enums';
import { useNavigate } from 'react-router-dom';
import { getChosenProductTypeId } from '../../redux/selectors/productTypes-selectors';
import { getOneClickOrderRequestStatus, getProductRequestStatus } from '../../redux/selectors/app-selectors';
import { RequestStatus } from '../../redux/reducers/enums';
import { setProductRequest } from '../../redux/reducers/app-reducer';
import { selectValues } from '../../Api/productsApi/enums';
import { SelectValuesTypes } from '../../Api/productsApi/types';
import { getChosenBrandsId } from '../../redux/selectors/brands-selectors';
import { location } from '../../enums';
import { getProductsInBasket } from '../../redux/selectors/basket-selectors';
import { AppDispatch } from '../../redux/store';
import { getProductForOneClickOrder } from '../../redux/selectors/oneClickOrder-selectors';
import { setProductToState } from '../../redux/reducers/onClickOrder-reducer';
import SuccessOrderModal from '../../components/common/modals/SuccessOrderModal/SuccessOrderModal';
import { getChosenOrdering } from '../../redux/selectors/ordering-selectors';
import { setChosenOrdering } from '../../redux/reducers/ordering-reducer';
import { useResize } from '../../customHooks/useResize';
import { PRODUCT_IMAGE } from '../../constants';

const CatalogPage = ( { openFiltersMode, closeEditMode }: CatalogPagePropsType ) => {

  const products = useSelector( getProductItems );
  const animal = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( animal );
  const page = useSelector( getActualPage );
  const totalProductsCount = useSelector( getTotalProductsCount );
  const pageSize = useSelector( getPageSize );
  const category = useSelector( getChosenProductTypeId );
  const isRejectResponse = useSelector( getProductRequestStatus ) === RequestStatus.FAILED;
  const isOneClickOrderSucceeded = useSelector( getOneClickOrderRequestStatus ) === RequestStatus.SUCCEEDED;
  const chosenBrands = useSelector( getChosenBrandsId );
  const productForOneClickOrderModal = useSelector( getProductForOneClickOrder );
  const chosenOrdering = useSelector( getChosenOrdering );
  const productsFromBasket = useSelector( getProductsInBasket );
  const { windowElRef, width } = useResize();
  const withWords = width >= 620;

  const [ productForBasketModal, setProductForBasketModal ] = useState<any>( null );
  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onPageChanged = ( pageNumber: number ) => {
    dispatch( setActualPage( { pageNumber } ) );
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
    setProductForBasketModal( null );
  };
  const openBasketModal = ( product: ProductItemType ) => {
    setProductForBasketModal( product );
    productsFromBasket.every( ( prod: ProductItemType ) => prod.chosen_option?.id !== product.chosen_option?.id )
      ? dispatch( setProductToBasket( { product } ) )
      : dispatch( incrementProductQuantity( { optionId: product.chosen_option.id, quantity: 1 } ) );
    setIsBasketModalActive( true );
  };
  const resetFilters = () => {
    dispatch( removeChosenBrandsId( {} ) );
    dispatch( removeChosenProductTypeId( {} ) );
    dispatch( removeChosenAnimalTypeId( {} ) );
    dispatch( setProductRequest( { status: RequestStatus.IDLE } ) );
  };
  const chooseOption = ( e: ChangeEvent<HTMLSelectElement> ) => {
    dispatch( setChosenOrdering( { ordering: e.currentTarget.value as SelectValuesTypes } ) );
  };

  useEffect( () => {
    const brands = chosenBrands.length ? chosenBrands?.join() : null;
    dispatch( fetchProductsTC( { page, animal, category, ordering: chosenOrdering, brands } ) );
  }, [ page, animal, category, chosenOrdering, chosenBrands ] );
  useEffect(() => {
    if(isBasketModalActive || isOneClickModalActive || isOneClickOrderSucceeded){
      window.document.body.style.overflow = 'hidden'
    }
    return () => {window.document.body.style.overflow = ''}
  }, [isOneClickModalActive, isBasketModalActive, isOneClickOrderSucceeded])

  return (
    <div
      className={ style.catalogPageBlock }
    >
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
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
            <option value={ selectValues.POPULARITY }
                    selected={ chosenOrdering === selectValues.POPULARITY }>популярности
            </option>
            <option value={ selectValues.NAME_POSITIVE }
                    selected={ chosenOrdering === selectValues.NAME_POSITIVE }>названию: «от А до Я»
            </option>
            <option value={ selectValues.NAME_NEGATIVE }
                    selected={ chosenOrdering === selectValues.NAME_NEGATIVE }>названию: «от Я до А»
            </option>
            <option value={ selectValues.PRICE_POSITIVE }
                    selected={ chosenOrdering === selectValues.PRICE_POSITIVE }>цене по возр.
            </option>
            <option value={ selectValues.PRICE_NEGATIVE }
                    selected={ chosenOrdering === selectValues.PRICE_NEGATIVE }>цене по убыв.
            </option>
            <option value={ selectValues.ADDED_DATE }
                    selected={ chosenOrdering === selectValues.ADDED_DATE }>новизне
            </option>
          </select>
        </div>
        <div onClick={ openFiltersMode } className={ style.catalogFilter }>
          <img className={ style.catalogFilterImage } src={ filterMajor } alt=""/>
          <div className={ style.catalogFilterText }>
            Фильтры
          </div>
        </div>
      </div>
      <div className={ style.mainBlock }>
        <div className={ style.sortingBlock }>
          <div className={ style.productsType }>
            <ProductTypesForm/>
            <BrandsForm closeEditMode={ closeEditMode }/>
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
                    forCatalog={true}
                  />,
                )
              }
              <ProductsBlockPagination
                totalProductsCount={ totalProductsCount }
                pageSize={ pageSize }
                actualPage={ page }
                onPageChanged={ onPageChanged }
                portionSize={ 3 }
                withWords={ withWords }
              />
            </div> )
            : ( <div className={ style.emptyCatalog }>
              <img src={ sadCat } alt="sadCat"/>
              <div className={ style.title }>
                <h3>По вашему запросу ничего не найдено. сбросьте фильтр и попробуйте с нова</h3>
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
          { isOneClickOrderSucceeded
            ? ( <SuccessOrderModal
              from={ location.ONE_CLICK_ORDER }
            /> )
            : ( <OneClickOrder
              id={ productForOneClickOrderModal.id }
              name={ productForOneClickOrderModal.name }
              image={ productForOneClickOrderModal.images[ 0 ] ? productForOneClickOrderModal.images[ 0 ].image : `${ PRODUCT_IMAGE }` }
              options={ productForOneClickOrderModal.options }
              chosen_option={ productForOneClickOrderModal.chosen_option }
              closeOneClickModal={ closeOneClickModal }
            /> )
          }

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
    </div>
  );
};

export default CatalogPage;

type CatalogPagePropsType = {
  openFiltersMode: () => void,
  closeEditMode: () => void
}