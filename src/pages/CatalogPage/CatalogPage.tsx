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
import { getChosenProductTypeId } from '../../redux/selectors/productTypes-selectors';
import { getProductRequestStatus } from '../../redux/selectors/app-selectors';
import { RequestStatus } from '../../redux/reducers/enums';
import { setProductRequest } from '../../redux/reducers/app-reducer';
import { selectValues } from '../../Api/productsApi/enums';
import { SelectValuesTypes } from '../../Api/productsApi/types';

const CatalogPage = ( { openFiltersMode, closeEditMode }: CatalogPagePropsType ) => {

  const products = useSelector( getProductItems );
  const animal = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( animal );
  const page = useSelector( getActualPage );
  const totalProductsCount = useSelector( getTotalProductsCount );
  const pageSize = useSelector( getPageSize );
  const category = useSelector( getChosenProductTypeId );
  const isRejectResponse = useSelector( getProductRequestStatus ) === RequestStatus.FAILED;

  const [ isOneClickModalActive, setIsOneClickModalActive ] = useState<boolean>( false );
  const [ isBasketModalActive, setIsBasketModalActive ] = useState<boolean>( false );
  const [ ordering, setOrdering ] = useState<SelectValuesTypes>( selectValues.ADDED_DATE );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPageChanged = ( pageNumber: number ) => {
    dispatch( setActualPage( { pageNumber } ) );
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
    dispatch( setProductRequest( { status: RequestStatus.IDLE } ) );
  };
  const chooseOption = ( e: ChangeEvent<HTMLSelectElement> ) => {
    // @ts-ignore
    setOrdering( e.currentTarget.value );
  };

  useEffect( () => {
    // @ts-ignore
    dispatch( fetchProductsTC( { page, animal, category, ordering } ) );
  }, [ page, animal, category, ordering ] );

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
        <h1>{ `Каталог товаров ${ subTitle }` }</h1>
        <div className={ style.select }>
          <p>Сортировка по: </p>
          <select
            name="select"
            value={ ordering }
            onChange={ chooseOption }>
            <option value={ selectValues.ADDED_DATE } selected={ ordering === selectValues.ADDED_DATE }>дате
              добавления
            </option>
            <option value={ selectValues.NAME_POSITIVE }
                    selected={ ordering === selectValues.NAME_POSITIVE }>названию: «от А до Я»
            </option>
            <option value={ selectValues.NAME_NEGATIVE }
                    selected={ ordering === selectValues.NAME_NEGATIVE }>названию: «от Я до А»
            </option>
            <option value={ selectValues.PRICE_POSITIVE }
                    selected={ ordering === selectValues.PRICE_POSITIVE }>цене по возр.
            </option>
            <option value={ selectValues.PRICE_NEGATIVE }
                    selected={ ordering === selectValues.PRICE_NEGATIVE }>цене по убыв.
            </option>
            <option value={ selectValues.POPULARITY }
                    selected={ ordering === selectValues.POPULARITY }>популярности
            </option>
          </select>
        </div>
        <div className={ style.catalogFilter }>
          <img className={ style.catalogFilterImage } src={ filterMajor } alt=""/>
          <div onClick={ openFiltersMode } className={ style.catalogFilterText }>
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
            ? ( <div className={ style.productsBlock }>
              {
                products.map( ( item: ProductItemType ) =>
                  <ProductItem
                    key={ item.id }
                    product={ item }
                    id={ item.id }
                    image={ item.images[ 0 ] ? item.images[ 0 ].image : 'https://compfixer.info/wp-content/uploads/2014/06/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D0%B8%D0%B3%D0%BD-%D0%BA%D0%B0%D0%B1-Samsung.png' }
                    name={ item.name }
                    options={ item.options }
                    classNameForDarkItem={ themeStyle.productItem }
                    unit={ item.options[ 0 ].units.unit_name }
                    openOneClickModal={ openOneClickModal }
                    openBasketModal={ openBasketModal }
                  />,
                )
              }
              <ProductsBlockPagination
                totalProductsCount={ totalProductsCount }
                pageSize={ pageSize }
                actualPage={ page }
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
      <div className={ style.catalogPopularProductsWrapper }>
        <PopularProductsBlock/>
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
            key={ products[ 0 ].id }
            id={ products[ 0 ].id }
            image={ products[ 0 ].images[ 0 ].image }
            name={ products[ 0 ].name }
            unit={ products[ 0 ].options[ 0 ].units.unit_name }
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

type CatalogPagePropsType = {
  openFiltersMode: () => void,
  closeEditMode: () => void
}