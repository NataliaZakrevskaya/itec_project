import { AppRootStateType } from '../store';
import { DiscountType } from '../../types';

export const getDiscountsForBasket = ( state: AppRootStateType ): Array<DiscountType> => state.discountForBasket.discount;
