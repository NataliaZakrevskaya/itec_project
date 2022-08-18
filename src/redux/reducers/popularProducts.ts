import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsAPI } from '../../Api/productsApi';
import { RequestStatus } from './enums';
import { setPopularProductRequestStatus } from './app';
import { OptionType, ProductItemType } from '../../types';

export const fetchPopularProductsTC = createAsyncThunk(
  'popularProducts/fetchPopularProducts', async ( param: { ordering: string, animal: number | null }, {
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
  initialState: {
    results: [] as Array<ProductItemType>,
    total_products: 0 as number,
    max_products_on_page: 15 as number,
    page_number: 1 as number,
    products_on_page: null as null | number,
    total_pages: 1 as number,
  },
  reducers: {
    setChosenOptionToPopularProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.results.findIndex( product => product.id === action.payload.productId );
      state.results[ index ].chosen_option = action.payload.option;
    },
  },
  extraReducers: ( builder => {
    builder.addCase( fetchPopularProductsTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return action.payload.products;
      }
    } );
  } ),
} );

export const popularProducts = slice.reducer;
export const { setChosenOptionToPopularProduct } = slice.actions;