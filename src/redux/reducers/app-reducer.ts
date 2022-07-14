import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './enums';
import { RequestStatusType } from './types';

export const slice = createSlice( {
  name: 'app',
  initialState: {
    productRequestStatus: RequestStatus.IDLE as RequestStatusType,
    callbackRequestStatus: RequestStatus.IDLE as RequestStatusType,
    orderRequestStatus: RequestStatus.IDLE as RequestStatusType,
  },
  reducers: {
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
  setProductRequest,
  setCallbackRequest,
  setOrderRequestStatus,
} = slice.actions;