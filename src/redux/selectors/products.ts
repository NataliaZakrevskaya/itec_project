import { AppRootStateType } from '../store';
import { ProductItemType } from '../../types';

export const getProductItems = ( state: AppRootStateType ): ProductItemType[] => {
  return state.products.results;
};
export const getActualPage = ( state: AppRootStateType ): number => {
  return state.products.page_number;
};
export const getTotalProductsCount = ( state: AppRootStateType ): number => {
  return state.products.total_products;
};
export const getPageSize = ( state: AppRootStateType ): number => {
  return state.products.max_products_on_page;
};
