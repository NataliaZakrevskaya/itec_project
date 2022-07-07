import { AppRootStateType } from '../store';
import { ProductItemType } from '../../mocks';

export const getTotalProductsCount = ( state: AppRootStateType ): number => {
  return state.basket.totalProductsCount;
};
export const getTotalSum = ( state: AppRootStateType ): number => {
  return state.basket.totalSum;
};
export const getProductsInBasket = ( state: AppRootStateType ): Array<ProductItemType> => {
  return state.basket.productsInBasket;
};