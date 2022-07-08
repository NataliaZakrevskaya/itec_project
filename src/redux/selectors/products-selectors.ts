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