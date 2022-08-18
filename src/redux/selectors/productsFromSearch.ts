import { AppRootStateType } from '../store';

export const getProductsFromSearch = ( state: AppRootStateType ) => {
  return state.productsFromSearch.results;
};