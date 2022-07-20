import { AppRootStateType } from '../store';

export const getProductRequestStatus = ( state: AppRootStateType ) => {
  return state.app.productRequestStatus;
};
export const getSearchProductStatus = ( state: AppRootStateType ) => {
  return state.app.searchProductStatus;
};