import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './enums';
import { RequestStatusType } from './types';

export const slice = createSlice( {
  name: 'app',
  initialState: {
    searchProductStatus: RequestStatus.IDLE as RequestStatusType,
    productRequestStatus: RequestStatus.IDLE as RequestStatusType,
    callbackRequestStatus: RequestStatus.IDLE as RequestStatusType,
    orderRequestStatus: RequestStatus.IDLE as RequestStatusType,
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
  },
} );

export const appReducer = slice.reducer;
export const {
  setSearchProductRequest,
  setProductRequest,
  setCallbackRequest,
  setOrderRequestStatus,
} = slice.actions;