import { AppRootStateType } from '../store';
import { ProductItemType } from '../../types';

export const getTotalProductsCount = ( state: AppRootStateType ): number => state.basket.totalProductsCount;
export const getTotalSum = ( state: AppRootStateType ): number => state.basket.totalSum;
export const getTotalSumWithDiscount = ( state: AppRootStateType ): number => state.basket.totalSumWithDiscount;
export const getProductsInBasket = ( state: AppRootStateType ): Array<ProductItemType> => state.basket.productsInBasket;
