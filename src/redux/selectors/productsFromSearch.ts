import { AppRootStateType } from '../store';

export const getProductsFromSearch = ( state: AppRootStateType ) => state.productsFromSearch.results;
