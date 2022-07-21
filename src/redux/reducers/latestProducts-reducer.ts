import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductItemType } from './products-reducer';
import { productsAPI } from '../../Api/productsApi/productsApi';
import { setLatestProductRequestStatus } from './app-reducer';
import { RequestStatus } from './enums';

export const fetchLatestProductsTC = createAsyncThunk(
  'latestProducts/fetchLatestProducts', async ( param: { ordering: string }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await productsAPI.setLatestProducts( param.ordering );
      dispatch( setLatestProductRequestStatus( { status: RequestStatus.SUCCEEDED } ) );
      return { products: res.data };
    } catch ( err ) {
      dispatch( setLatestProductRequestStatus( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);
export const slice = createSlice( {
  name: 'latestProducts',
  initialState: {} as latestProductsInitialStateType,
  reducers: {},
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchLatestProductsTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return action.payload.products;
      }
    } );
  } ),
} );

export const latestProductsReducer = slice.reducer;

type latestProductsInitialStateType = {
  results: Array<ProductItemType>,
  total_products: number,
  max_products_on_page: number,
  page_number: number,
  products_on_page: null | number,
  total_pages: number,
}