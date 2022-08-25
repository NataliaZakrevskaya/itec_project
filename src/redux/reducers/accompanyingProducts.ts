import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAccompanyingProductRequestStatus } from './app';
import { RequestStatus } from './enums';
import { OptionType, ProductItemType } from '../../types';
import { accompanyingProductsApi } from '../../Api/accompanyingProductsApi/accompanyingProducts';

export const fetchAccompanyingProductsTC = createAsyncThunk(
  'accompanyingProducts/fetchAccompanyingProducts', async ( param: { productId: number }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await accompanyingProductsApi.setAccompanyingProducts( param.productId );
      dispatch( setAccompanyingProductRequestStatus( { status: RequestStatus.SUCCEEDED } ) );
      return { accompanyingProducts: res.data };
    } catch ( err ) {
      dispatch( setAccompanyingProductRequestStatus( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);
export const slice = createSlice( {
  name: 'accompanyingProducts',
  initialState: {
    results: [] as Array<ProductItemType>,
  },
  reducers: {
    setChosenOptionToAccompanyingProducts( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.results.findIndex( product => product.id === action.payload.productId );
      state.results[ index ].chosen_option = action.payload.option;
    },
  },
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchAccompanyingProductsTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return action.payload.accompanyingProducts;
      }
    } );
  } ),
} );

export const accompanyingProducts = slice.reducer;
export const { setChosenOptionToAccompanyingProducts } = slice.actions;