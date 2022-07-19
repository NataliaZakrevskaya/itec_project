import React from 'react';
import { routesPathsEnum } from './enums';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import ArticlesPage from '../pages/ArticlesPage/ArticlesPage';
import ArticlePage from '../pages/ArticlePage/ArticlePage';
import BasketPage from '../pages/BasketPage/BasketPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const AppRoutes = ({openFiltersMode, closeEditMode}: AppRoutesPropsType) => {
  return (
      <Routes>
        <Route path={ routesPathsEnum.MAIN } element={ <MainPage/> }/>
        <Route path={ routesPathsEnum.CATALOG } element={ <CatalogPage openFiltersMode={openFiltersMode} closeEditMode={closeEditMode}/> }/>
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

type AppRoutesPropsType = {
  openFiltersMode: () => void,
  closeEditMode: () => void
}