import { AppRootStateType } from '../store';

export const getDiscountFilterStatus = ( state: AppRootStateType ) => state.discountFilter.discountFilterStatus;