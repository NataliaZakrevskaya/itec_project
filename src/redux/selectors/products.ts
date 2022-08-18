import { AppRootStateType } from '../store';
import { ProductItemType } from '../../types';

export const getProductItems = ( state: AppRootStateType ): ProductItemType[] => state.products.results;
export const getActualPage = ( state: AppRootStateType ): number => state.products.page_number;
export const getTotalProductsCount = ( state: AppRootStateType ): number => state.products.total_products;
export const getPageSize = ( state: AppRootStateType ): number => state.products.max_products_on_page;

