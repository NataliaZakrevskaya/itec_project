import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from './products-reducer';
import { productsAPI } from '../../Api/productsApi/productsApi';
import { setLatestProductRequestStatus } from './app-reducer';
import { RequestStatus } from './enums';
import { OptionType } from '../../mocks';

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
  initialState: {} as latestProductsInitialStateType,
  reducers: {
    setChosenOptionToLatestProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.results.findIndex(product => product.id === action.payload.productId)
      state.results[index].chosen_option = action.payload.option
    },
  },
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
export const { setChosenOptionToLatestProduct } = slice.actions;

type latestProductsInitialStateType = {
  results: Array<ProductItemType>,
  total_products: number,
  max_products_on_page: number,
  page_number: number,
  products_on_page: null | number,
  total_pages: number,
}