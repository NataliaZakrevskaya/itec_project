import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const slice = createSlice( {
  name: 'discountFilter',
  initialState: {
    discountFilterStatus: false,
  },
  reducers: {
    setChosenDiscountFilterStatus( state, action: PayloadAction<{ filterStatus: boolean }> ) {
      state.discountFilterStatus = action.payload.filterStatus;
    },
  },
} );

export const discountFilter = slice.reducer;
export const { setChosenDiscountFilterStatus } = slice.actions;