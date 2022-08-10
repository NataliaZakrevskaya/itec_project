import { AppRootStateType } from '../store';

export const getProductForOneClickOrder = ( state: AppRootStateType ) => {
  return state.oneClickOrder;
};