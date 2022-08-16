import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DiscountType } from '../../mocks';
import { discountsAPI } from '../../Api/discountsApi/discountsApi';

export const fetchDiscountsTC = createAsyncThunk(
  'discounts/fetchDiscounts', async ( param, { dispatch, rejectWithValue } ) => {
    const res = await discountsAPI.setDiscountTypes();
    try {
      return { discounts: res.data };
    } catch ( err ) {
      rejectWithValue(null)
    }
  },
);

export const slice = createSlice( {
  name: 'discounts',
  initialState: {
    discounts: [] as Array<DiscountType>,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase( fetchDiscountsTC.fulfilled, (
        state, action ) => {
      if(action.payload) state.discounts = action.payload.discounts;
      },
    );
  },
} );

export const discountsReducer = slice.reducer;