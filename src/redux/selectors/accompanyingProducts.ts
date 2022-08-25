import { AppRootStateType } from '../store';
import { ProductItemType } from '../../types';

export const getAccompanyingProducts = ( state: AppRootStateType ): Array<ProductItemType> => state.accompanyingProducts.results;