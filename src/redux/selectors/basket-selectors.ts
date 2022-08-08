import { AppRootStateType } from '../store';
import { ProductItemType } from '../reducers/products-reducer';

export const getTotalProductsCount = ( state: AppRootStateType ): number => {
  return state.basket.totalProductsCount;
};
export const getTotalSum = ( state: AppRootStateType ): number => {
  return state.basket.totalSum;
};
export const getTotalSumWithDiscount = ( state: AppRootStateType ): number => {
  return state.basket.totalSumWithDiscount;
};
export const getProductsInBasket = ( state: AppRootStateType ): Array<ProductItemType> => {
  return state.basket.productsInBasket;
};