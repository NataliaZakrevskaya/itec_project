import { AppRootStateType } from '../store';
import { DiscountType } from '../../types';

export const getDiscounts = ( state: AppRootStateType ): Array<DiscountType> => {
  return state.discounts.discounts;
};