import { AppRootStateType } from '../store';

export const getProductRequestStatus = ( state: AppRootStateType ) => {
  return state.app.productRequestStatus;
};
export const getSearchProductStatus = ( state: AppRootStateType ) => {
  return state.app.searchProductStatus;
};
export const getCallbackRequestStatus = ( state: AppRootStateType ) => {
  return state.app.callbackRequestStatus;
};
export const getOrderRequestStatus = ( state: AppRootStateType ) => {
  return state.app.orderRequestStatus;
};