import { AppRootStateType } from '../store';
import { ProductItemType } from '../reducers/products-reducer';

export const getProductItems = (state: AppRootStateType): ProductItemType[] => {
  return state.products.results
}
/*export const getWithThisProductsByItems = (state: AppRootStateType): ProductItemType[] => {
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
}*/
export const getActualPage = (state: AppRootStateType): number => {
  return state.products.page_number
}
export const getTotalProductsCount = (state: AppRootStateType): number => {
  return state.products.total_products
}
export const getPageSize = (state: AppRootStateType): number => {
  return state.products.max_products_on_page
}