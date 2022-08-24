import { AppRootStateType } from '../store';
import { OneProductItemType, ProductItemType } from '../../types';

export const getProductsArrayForOneClickOrder = ( state: AppRootStateType ): Array<ProductItemType | OneProductItemType> => state.oneClickOrder.productsInBasket;
export const getProductForOneClickOrder = ( state: AppRootStateType ): ProductItemType | OneProductItemType => state.oneClickOrder.productsInBasket[0];
export const getProductCount = ( state: AppRootStateType ): number => state.oneClickOrder.totalProductsCount;
export const getPriceWithoutDiscount = ( state: AppRootStateType ): number => state.oneClickOrder.totalSum;
export const getPriceWithDiscount = ( state: AppRootStateType ): number => state.oneClickOrder.totalSumWithDiscount;
