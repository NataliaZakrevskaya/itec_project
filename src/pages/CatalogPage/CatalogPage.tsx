import React, { useState } from 'react';
import nextIcon from '../../Images/nextIcon.svg';
import style from './CatalogPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import themeStyle from '../../styles/common/DarkBlock.module.scss';
import AnimalsTypesList from '../../components/AnimalsTypesList/AnimalsTypesList';
import ProductTypesForm from '../../components/ProductTypesForm/ProductTypesForm';
import BrandsForm from '../../components/BrandsForm/BrandsForm';
import { getProductItems } from '../../mocks';
import ProductItem from '../../components/ProductItem/ProductItem';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import ProductsBlockPagination from '../../components/ProductsBlockPagination/ProductsBlockPagination';
import { useSelector } from 'react-redux';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getTitleForProductsBlock } from '../../helpers/getTitle';
import Modal from '../../components/common/modals/Modal';
import OnClickOrder from '../../components/common/modals/OnClickOrder/OnClickOrder';

const CatalogPage = () => {

  const products = getProductItems();
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( chosenAnimalTypeId );
  const [ isModalActive, setIsModalActive ] = useState<boolean>( false );
  const closeModal = () => {
    setIsModalActive( false );
  };
  const openModal = () => {
    setIsModalActive(true)
  }

  return (
    <div className={ style.catalogPageBlock }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={navigationStyle.navigationBlockWrapper}>
            <p>Главная</p>
            <img src={ nextIcon } alt="nextIcon"/>
            <p>Каталог</p>
        </div>
      </div>
      <AnimalsTypesList/>
      <div className={ style.title }>
        <h1>{ `Каталог товаров ${subTitle}` }</h1>{/* //todo позже будет меняться в зависимости от выбранного типа животного*/ }
        <div className={ style.select }>
          <p>Сортировка по: </p>
          <select name="select" >
            <option value="value1" selected>дате добавления</option>
            <option value="value2">названию: «от А до Я»</option>
            <option value="value3">названию: «от Я до А»</option>
            <option value="value3">цене по возр.</option>
            <option value="value3">цене по убыв.</option>
            <option value="value3">популярности</option>
          </select>
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
          <div className={ style.productsBlock }>
            {
              products.map( ( item: any ) =>
                <ProductItem
                  key={ item.id }
                  id={ item.id }
                  image={ item.images[ 0 ].image }
                  name={ item.name }
                  options={ item.options }
                  classNameForDarkItem={themeStyle.productItem}
                  unit={item.unit}
                  onClick={openModal}
                />,
              )
            }
          </div>
          <ProductsBlockPagination/>
        </div>
      </div>
      <PopularProductsBlock/>
      <UsefulArticlesBlock/>
      {isModalActive &&
        <Modal closeModal={ closeModal }>
          <OnClickOrder/>
        </Modal>}
    </div>
  );
};

export default CatalogPage;