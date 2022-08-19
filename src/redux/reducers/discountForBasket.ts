import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { discountsAPI } from '../../Api/discountsApi';
import { DiscountType, Nullable } from '../../types';

export const fetchDiscountForBasketTC = createAsyncThunk(
  'discountForBasket/fetchDiscountForBasket', async ( param, { rejectWithValue } ) => {
    const res = await discountsAPI.setDiscountTypes();
    try {
      return { discount: res.data };
    } catch ( err ) {
      rejectWithValue( null );
    }
  },
);

export const slice = createSlice( {
  name: 'discountForBasket',
  initialState: {
    discount: [] as Array<Nullable<DiscountType>>,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase( fetchDiscountForBasketTC.fulfilled, (
        state, action ) => {
        if ( action.payload ) state.discount = action.payload.discount;
      },
    );
  },
} );

export const discountForBasket = slice.reducer;