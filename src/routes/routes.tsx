import React from 'react';
import { routesPathsEnum } from './enums';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import ProductPage from '../pages/ProductPage';
import ArticlesPage from '../pages/ArticlesPage';
import ArticlePage from '../pages/ArticlePage';
import BasketPage from '../pages/BasketPage';
import CheckoutPage from '../pages/CheckoutPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path={ routesPathsEnum.MAIN } element={ <MainPage/> }/>
        <Route path={ routesPathsEnum.CATALOG } element={ <CatalogPage/> }/>
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