import React from 'react';
import { routesPathsEnum } from './enums';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesPropsType } from './types';

const MainPage = React.lazy( () => import('../pages/MainPage/MainPage') );
const CatalogPage = React.lazy( () => import('../pages/CatalogPage/CatalogPage') );
const ProductPage = React.lazy( () => import('../pages/ProductPage/ProductPage') );
const ArticlesPage = React.lazy( () => import('../pages/ArticlesPage/ArticlesPage') );
const ArticlePage = React.lazy( () => import('../pages/ArticlePage/ArticlePage') );
const BasketPage = React.lazy( () => import('../pages/BasketPage/BasketPage') );
const CheckoutPage = React.lazy( () => import('../pages/CheckoutPage/CheckoutPage') );
const NotFoundPage = React.lazy( () => import('../pages/NotFoundPage/NotFoundPage') );

const AppRoutes = ( { openFiltersMode, closeEditMode }: AppRoutesPropsType ) => {
  return (
    <Routes>
      <Route path={ routesPathsEnum.MAIN } element={ <MainPage/> }/>
      <Route path={ routesPathsEnum.CATALOG }
             element={ <CatalogPage openFiltersMode={ openFiltersMode } closeEditMode={ closeEditMode }/> }/>
      <Route path={ routesPathsEnum.PRODUCT_WITH_ID } element={ <ProductPage/> }/>
      <Route path={ routesPathsEnum.ARTICLES } element={ <ArticlesPage/> }/>
      <Route path={ routesPathsEnum.ARTICLE_WITH_ID } element={ <ArticlePage/> }/>
      <Route path={ routesPathsEnum.BASKET } element={ <BasketPage/> }/>
      <Route path={ routesPathsEnum.CHECKOUT } element={ <CheckoutPage/> }/>
      <Route path={ '*' } element={ <NotFoundPage/> }/>
    </Routes>
  );
};

export default AppRoutes;