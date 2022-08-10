import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsAPI } from '../../Api/productsApi/productsApi';
import { setLatestProductRequestStatus } from './app-reducer';
import { RequestStatus } from './enums';
import { OptionType, ProductItemType } from '../../mocks';
import { latestProductsInitialStateType } from './types';

export const fetchLatestProductsTC = createAsyncThunk(
  'latestProducts/fetchLatestProducts', async ( param: { ordering: string }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await productsAPI.setProductsByOrdering( param.ordering );
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
  initialState: {
    results: [] as Array<ProductItemType>,
    total_products: 0 as number,
    max_products_on_page: 15 as number,
    page_number: 1 as number,
    products_on_page: null as null | number,
    total_pages: 1 as number,
  } as latestProductsInitialStateType,
  reducers: {
    setChosenOptionToLatestProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.results.findIndex( product => product.id === action.payload.productId );
      state.results[ index ].chosen_option = action.payload.option;
    },
  },
  extraReducers: ( builder => {
    builder.addCase( fetchLatestProductsTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return action.payload.products;
      }
    } );
  } ),
} );

export const latestProductsReducer = slice.reducer;
export const { setChosenOptionToLatestProduct } = slice.actions;