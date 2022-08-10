import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productTypesAPI } from '../../Api/productTypesApi/productTypesApi';
import { ProductTypesType } from './types';

export const fetchProductTypesTC = createAsyncThunk(
  'productTypes/fetchProductTypes', async ( param, { dispatch, rejectWithValue } ) => {
    const res = await productTypesAPI.setProductTypes();
    try {
      return { productTypes: res.data };
    } catch ( err ) {
      rejectWithValue(null)
    }
  },
);

export const slice = createSlice( {
  name: 'productTypes',
  initialState: {
    productTypes: [] as Array<ProductTypesType>,
    chosenProductTypeId: null as number | null,
  },
  reducers: {
    setChosenProductTypeId( state, action: PayloadAction<{ id: number }> ) {
      state.chosenProductTypeId = action.payload.id;
    },
    removeChosenProductTypeId( state, action ) {
      state.chosenProductTypeId = null;
    },
  }, extraReducers: builder => {
    builder.addCase( fetchProductTypesTC.fulfilled, (
        state, action ) => {
        // @ts-ignore
        state.productTypes = action.payload.productTypes;
      },
    );
  },
} );

export const productTypesReducer = slice.reducer;
export const { setChosenProductTypeId, removeChosenProductTypeId } = slice.actions;
