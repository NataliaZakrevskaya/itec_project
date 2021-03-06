import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productAPI } from '../../Api/productApi/productApi';
import { getProductInitState, OptionType } from '../../mocks';

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
    // @ts-ignore
    builder.addCase( fetchProductTC.fulfilled, ( state, action ) => {
      return action.payload?.product;
    } );
  } ),
} );

export const productReducer = slice.reducer;
export const { setChosenOptionToProduct } = slice.actions;