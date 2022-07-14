import { AppRootStateType } from '../store';
import { ProductItemType } from '../reducers/products-reducer';

export const getProductItems = (state: AppRootStateType): ProductItemType[] => {
  return state.products.products
}
export const getWithThisProductsByItems = (state: AppRootStateType): ProductItemType[] => {
  return state.products.withThisProductBy
}
export const getPreviouslyProductItems = (state: AppRootStateType): ProductItemType[] => {
  return state.products.previouslyProducts
}
export const getPopularProductsItems = (state: AppRootStateType): ProductItemType[] => {
  return state.products.popularProducts
}
export const getLatestProductsItems = (state: AppRootStateType): ProductItemType[] => {
  return state.products.latestProducts
}
export const getActualPage = (state: AppRootStateType): number => {
  return state.products.pageNumber
}
export const getTotalProductsCount = (state: AppRootStateType): number => {
  return state.products.totalProductsCount
}
export const getPageSize = (state: AppRootStateType): number => {
  return state.products.maxProductItemsOnPage
}