import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productAPI } from '../../Api/productApi';
import { getProductInitState } from '../../mocks';
import { OptionType } from '../../types';

export const fetchProductTC = createAsyncThunk(
  'product/fetchProduct', async ( param: { productId: number }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await productAPI.setProduct( param.productId );
      return { product: res.data };
    } catch ( err ) {
      rejectWithValue( null );
    }
  },
);

export const slice = createSlice( {
  name: 'product',
  initialState: getProductInitState(),
  reducers: {
    setChosenOptionToProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      state.chosen_option = action.payload.option;
    },
  },
  extraReducers: ( builder => {
    builder.addCase( fetchProductTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return { ...action.payload.product,
          options: action.payload.product.options.map( option => option.partial ? {
            ...option,
            quantity: 1000,
          } : option ),
          chosen_option: action.payload.product.chosen_option.partial ? {...action.payload.product.chosen_option, quantity: 1000} : action.payload.product.chosen_option
        };
      }
    } );
  } ),
} );

export const product = slice.reducer;
export const { setChosenOptionToProduct } = slice.actions;