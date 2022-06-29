import React from 'react';
import nextIcon from '../../Images/nextIcon.svg';
import style from './CatalogPage.module.scss';
import AnimalsTypesList from '../../components/AnimalsTypesList/AnimalsTypesList';
import ProductTypesForm from '../../components/ProductTypesForm/ProductTypesForm';
import BrandsForm from '../../components/BrandsForm/BrandsForm';
import { getProductItems } from '../../mocks';
import ProductItem from '../../components/ProductItem/ProductItem';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import ProductsBlockPagination from '../../components/ProductsBlockPagination/ProductsBlockPagination';

const CatalogPage = () => {
  const products = getProductItems();

  return (
    <div className={ style.catalogPageBlock }>
      <div className={ style.navigationBlock }>
        <p>Главная
          <img src={ nextIcon } alt="nextIcon"/>
          Каталог
        </p>
      </div>
      <AnimalsTypesList/>
      <div className={ style.title }>
        <h1>Каталог товаров</h1>{/* //todo позже будет меняться в зависимости от выбранного типа животного*/ }
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
                  img={ item.img[ 0 ] }
                  title={ item.title }
                  units={ item.units }
                  price={ item.units[ 0 ].price }
                />,
              )
            }
          </div>
          <ProductsBlockPagination/>
        </div>
      </div>
      <PopularProductsBlock/>
      <UsefulArticlesBlock/>
    </div>
  );
};

export default CatalogPage;