import React, { useEffect, useState } from 'react';
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
import OnClickOrder from '../../components/common/modals/OnClickOrder/OnClickOrder';
import BasketModal from '../../components/common/modals/BasketModal/BasketModal';
import sadCat from '../../Images/sadCat.svg';
import filterMajor from '../../Images/filter_major.svg';
import { removeChosenBrandsId } from '../../redux/reducers/brands-reducer';
import { removeChosenProductTypeId } from '../../redux/reducers/productTypes-reducer';
import { removeChosenAnimalTypeId } from '../../redux/reducers/animalTypes-reducer';
import { setProductToBasket } from '../../redux/reducers/basket-reducer';
import { fetchProductsTC, ProductItemType, setActualPage } from '../../redux/reducers/products-reducer';
import {
  getActualPage,
  getPageSize,
  getProductItems,
  getTotalProductsCount,
} from '../../redux/selectors/products-selectors';
import { routesPathsEnum } from '../../routes/enums';
import { useNavigate } from 'react-router-dom';

const CatalogPage = () => {

  const products = useSelector( getProductItems );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( chosenAnimalTypeId );
  const actualPage = useSelector( getActualPage );
  const totalProductsCount = useSelector( getTotalProductsCount );
  const pageSize = useSelector( getPageSize );

  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const [ isRejectResponse, setIsRejectResponse ] = useState<boolean>( false );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPageChanged = ( pageNumber: number ) => {
    alert( `${ pageNumber }` ); //todo позже санка с запросом продуктов
    dispatch(setActualPage({pageNumber}))
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
    dispatch( setProductToBasket( { product } ) );
    setIsBasketModalActive( true );
  };
  const resetFilters = () => {
    // @ts-ignore
    dispatch( removeChosenBrandsId() );
    // @ts-ignore
    dispatch( removeChosenProductTypeId() );
    // @ts-ignore
    dispatch( removeChosenAnimalTypeId() );
    setIsRejectResponse( false );
  };

  useEffect( () => {
    // @ts-ignore
    dispatch( fetchProductsTC() );
  }, [] );

  return (
    <div className={ style.catalogPageBlock }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>Каталог</p>
        </div>
      </div>
      <AnimalsTypesList/>
      <div className={ style.title }>
        <h1>{ `Каталог товаров ${ subTitle }` }</h1>{/* //todo позже будет меняться в зависимости от выбранного типа животного*/ }
        <div className={ style.select }>
          <p>Сортировка по: </p>
          <select name="select">
            <option value="value1" selected>дате добавления</option>
            <option value="value2">названию: «от А до Я»</option>
            <option value="value3">названию: «от Я до А»</option>
            <option value="value3">цене по возр.</option>
            <option value="value3">цене по убыв.</option>
            <option value="value3">популярности</option>
          </select>
        </div>
        <div className={ style.catalogFilter }>
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
            <BrandsForm/>
          </div>
        </div>
        <div className={ style.productsBlockContainer }>
          { !isRejectResponse
            ? ( <div className={ style.productsBlock }>
              {
                products.map( ( item: ProductItemType ) =>
                  <ProductItem
                    key={ item.id }
                    product={ item }
                    id={ item.id }
                    image={ item.images[ 0 ].image }
                    name={ item.name }
                    options={ item.options }
                    classNameForDarkItem={ themeStyle.productItem }
                    unit={ item.unit }
                    openOneClickModal={ openOneClickModal }
                    openBasketModal={ openBasketModal }
                  />,
                )
              }
              <ProductsBlockPagination
                totalProductsCount={ totalProductsCount }
                pageSize={ pageSize }
                actualPage={ actualPage }
                onPageChanged={ onPageChanged }
                portionSize={ 3 }/>
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
      <PopularProductsBlock/>
      <UsefulArticlesBlock/>
      { isOneClickModalActive &&
        <Modal closeModal={ closeOneClickModal }>
          <OnClickOrder/>
        </Modal>
      }
      { isBasketModalActive &&
        <Modal closeModal={ closeBasketModal }>
          <BasketModal
            key={ products[ 0 ].id }
            id={ products[ 0 ].id }
            image={ products[ 0 ].images[ 0 ].image }
            name={ products[ 0 ].name }
            unit={ products[ 0 ].unit }
            options={ products[ 0 ].options }
            isForModal={ true }
            closeModal={ closeBasketModal }
          />
        </Modal>
      }
    </div>
  );
};

export default CatalogPage;