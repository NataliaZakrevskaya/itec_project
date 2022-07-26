import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductItemType } from './products-reducer';
import { productsAPI } from '../../Api/productsApi/productsApi';
import { setSearchProductRequest } from './app-reducer';
import { RequestStatus } from './enums';

export const fetchProductsFromSearchTC = createAsyncThunk(
  'productsFromSearch/fetchProductsFromSearch', async ( param: { search?: string }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await productsAPI.setProductsByName( param.search );
      dispatch( setSearchProductRequest( { status: RequestStatus.SUCCEEDED } ) );
      return { products: res.data };
    } catch ( err ) {
      dispatch( setSearchProductRequest( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);
export const slice = createSlice( {
  name: 'productsFromSearch',
  initialState: {
    results: [] as Array<ProductItemType>,
    total_products: 0 as number,
    max_products_on_page: 15 as number,
    page_number: 1 as number,
    products_on_page: null as null | number,
    total_pages: 1 as number,
  } as productsFromSearchInitialStateType,
  reducers: {},
  extraReducers: ( builder => {
    builder.addCase( fetchProductsFromSearchTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return action.payload.products;
      }
    } );
  } ),
} );

export const productsFromSearchReducer = slice.reducer;

type productsFromSearchInitialStateType = {
  results: Array<ProductItemType>,
  total_products: number,
  max_products_on_page: number,
  page_number: number,
  products_on_page: null | number,
  total_pages: number,
}
