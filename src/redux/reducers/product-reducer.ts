import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productAPI } from '../../Api/productApi/productApi';
import { getProductInitState } from '../../mocks';

export const fetchProductTC = createAsyncThunk(
  'product/fetchProduct', async ( param: { productId: number }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await productAPI.setProduct( param.productId );
      return { products: res.data };
    } catch ( err ) {
      rejectWithValue( null );
    }
  },
);

export const slice = createSlice( {
  name: 'product',
  initialState: getProductInitState(),
  reducers: {},
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchProductTC.fulfilled, ( state, action ) => {
      return action.payload?.products;
    } );
  } ),
} );

export const productReducer = slice.reducer;