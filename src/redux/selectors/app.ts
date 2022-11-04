import { AppRootStateType } from '../store';

export const getProductRequestStatus = ( state: AppRootStateType ) => state.app.productRequestStatus;
export const getSearchProductStatus = ( state: AppRootStateType ) => state.app.searchProductStatus;
export const getCallbackRequestStatus = ( state: AppRootStateType ) => state.app.callbackRequestStatus;
export const getOrderRequestStatus = ( state: AppRootStateType ) => state.app.orderRequestStatus;
export const getSendingReviewsRequestStatus = ( state: AppRootStateType ) => state.app.sendingReviewRequestStatus;
export const getOneClickOrderRequestStatus = ( state: AppRootStateType ) => state.app.oneClickOrderRequestStatus;
export const getWeightSetValue = ( state: AppRootStateType ) => state.app.weightSetIsShowed;
export const getBadProductsList = ( state: AppRootStateType ) => state.app.badProductsList;
