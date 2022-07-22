import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsAPI } from '../../Api/productsApi/productsApi';
import { RequestStatus } from './enums';
import { ProductItemType } from './products-reducer';
import { setPopularProductRequestStatus } from './app-reducer';
import { OptionType } from '../../mocks';

export const fetchPopularProductsTC = createAsyncThunk(
  'popularProducts/fetchPopularProducts', async ( param: { ordering: string, animal: number }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await productsAPI.setPopularProducts( param.ordering, param.animal );
      dispatch( setPopularProductRequestStatus( { status: RequestStatus.SUCCEEDED } ) );
      return { products: res.data };
    } catch ( err ) {
      dispatch( setPopularProductRequestStatus( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);
export const slice = createSlice( {
  name: 'popularProducts',
  initialState: {} as popularProductsInitialStateType,
  reducers: {
    setChosenOptionToPopularProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.results.findIndex(product => product.id === action.payload.productId)
      state.results[index].chosen_option = action.payload.option
    },
  },
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchPopularProductsTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return action.payload.products;
      }
    } );
  } ),
} );

export const popularProductsReducer = slice.reducer;
export const { setChosenOptionToPopularProduct } = slice.actions;

type popularProductsInitialStateType = {
  results: Array<ProductItemType>,
  total_products: number,
  max_products_on_page: number,
  page_number: number,
  products_on_page: null | number,
  total_pages: number,
}