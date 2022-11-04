import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './enums';
import { RequestStatusType } from './types';
import { ProductItemType } from '../../types';

export const slice = createSlice( {
  name: 'app',
  initialState: {
    searchProductStatus: RequestStatus.IDLE as RequestStatusType,
    latestProductStatus: RequestStatus.IDLE as RequestStatusType,
    accompanyingProductStatus: RequestStatus.IDLE as RequestStatusType,
    popularProductStatus: RequestStatus.IDLE as RequestStatusType,
    productRequestStatus: RequestStatus.IDLE as RequestStatusType,
    callbackRequestStatus: RequestStatus.IDLE as RequestStatusType,
    orderRequestStatus: RequestStatus.IDLE as RequestStatusType,
    oneClickOrderRequestStatus: RequestStatus.IDLE as RequestStatusType,
    sendingReviewRequestStatus: RequestStatus.IDLE as RequestStatusType,
    weightSetIsShowed: false,
    badProductsList: [] as ProductItemType[],
  },
  reducers: {
    setSearchProductRequest( state, action: PayloadAction<{
      status: RequestStatusType
    }> ) {
      state.searchProductStatus = action.payload.status;
    },
    setProductRequest( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.productRequestStatus = action.payload.status;
    },
    setCallbackRequest( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.callbackRequestStatus = action.payload.status;
    },
    setOrderRequestStatus( state, action: PayloadAction<{ status: RequestStatusType, productList?: ProductItemType[] }> ) {
      state.orderRequestStatus = action.payload.status;
      action.payload.status === RequestStatus.FAILED && action.payload.productList ? state.badProductsList = action.payload.productList : state.badProductsList = [];
    },
    setLatestProductRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.latestProductStatus = action.payload.status;
    },
    setAccompanyingProductRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.accompanyingProductStatus = action.payload.status;
    },
    setPopularProductRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.popularProductStatus = action.payload.status;
    },
    setOneClickOrderRequestStatus( state, action: PayloadAction<{ status: RequestStatusType, productList?: ProductItemType[] }> ) {
      state.oneClickOrderRequestStatus = action.payload.status;
      action.payload.status === RequestStatus.FAILED && action.payload.productList ? state.badProductsList = action.payload.productList : state.badProductsList = [];
    },
    setCallbackRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.callbackRequestStatus = action.payload.status;
    },
    setSendingReviewRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.sendingReviewRequestStatus = action.payload.status;
    },
    setWeightSetIsShowed( state, action: PayloadAction<{ status: boolean }> ) {
      state.weightSetIsShowed = action.payload.status;
    },
  },
} );

export const app = slice.reducer;
export const {
  setSearchProductRequest,
  setProductRequest,
  setCallbackRequest,
  setOrderRequestStatus,
  setLatestProductRequestStatus,
  setAccompanyingProductRequestStatus,
  setPopularProductRequestStatus,
  setOneClickOrderRequestStatus,
  setCallbackRequestStatus,
  setSendingReviewRequestStatus,
  setWeightSetIsShowed,
} = slice.actions;