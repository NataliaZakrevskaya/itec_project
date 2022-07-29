import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './enums';
import { RequestStatusType } from './types';

export const slice = createSlice( {
  name: 'app',
  initialState: {
    searchProductStatus: RequestStatus.IDLE as RequestStatusType,
    latestProductStatus: RequestStatus.IDLE as RequestStatusType,
    popularProductStatus: RequestStatus.IDLE as RequestStatusType,
    productRequestStatus: RequestStatus.IDLE as RequestStatusType,
    callbackRequestStatus: RequestStatus.IDLE as RequestStatusType,
    orderRequestStatus: RequestStatus.IDLE as RequestStatusType,
    oneClickOrderRequestStatus: RequestStatus.IDLE as RequestStatusType,
  },
  reducers: {
    setSearchProductRequest( state, action: PayloadAction<{
      status: RequestStatusType }> ) {
      state.searchProductStatus = action.payload.status;
    },
    setProductRequest( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.productRequestStatus = action.payload.status;
    },
    setCallbackRequest( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.callbackRequestStatus = action.payload.status;
    },
    setOrderRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.orderRequestStatus = action.payload.status;
    },
    setLatestProductRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.latestProductStatus = action.payload.status;
    },
    setPopularProductRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.popularProductStatus = action.payload.status;
    },
    setOneClickOrderRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.oneClickOrderRequestStatus = action.payload.status;
    },
    setCallbackRequestStatus( state, action: PayloadAction<{ status: RequestStatusType }> ) {
      state.callbackRequestStatus = action.payload.status;
    },
  },
} );

export const appReducer = slice.reducer;
export const {
  setSearchProductRequest,
  setProductRequest,
  setCallbackRequest,
  setOrderRequestStatus,
  setLatestProductRequestStatus,
  setPopularProductRequestStatus,
  setOneClickOrderRequestStatus,
  setCallbackRequestStatus,
} = slice.actions;