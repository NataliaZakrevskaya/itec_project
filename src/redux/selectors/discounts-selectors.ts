import { AppRootStateType } from '../store';
import { DiscountType } from '../../mocks';

export const getDiscounts = ( state: AppRootStateType ): Array<DiscountType> => {
  return state.discounts.discounts;
};