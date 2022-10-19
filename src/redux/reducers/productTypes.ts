import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productTypesAPI } from '../../Api/productTypesApi';
import { ProductTypesType } from './types';
import { Nullable } from '../../types';

export const fetchProductTypesTC = createAsyncThunk(
  'productTypes/fetchProductTypes', async ( param: { animalId: number }, { rejectWithValue } ) => {
    const res = await productTypesAPI.setProductTypes( param.animalId );
    try {
      return { productTypes: res.data };
    } catch ( err ) {
      rejectWithValue( null );
    }
  },
);

export const slice = createSlice( {
  name: 'productTypes',
  initialState: {
    productTypes: [] as Array<ProductTypesType>,
    chosenProductTypeId: null as Nullable<number>,
    chosenProductSubTypesId: [] as number[],
  },
  reducers: {
    setChosenProductTypeId( state, action: PayloadAction<{ id: number }> ) {
      state.chosenProductTypeId = action.payload.id;
      state.chosenProductSubTypesId = [];
    },
    removeChosenProductTypeId( state ) {
      state.chosenProductTypeId = null;
      state.chosenProductSubTypesId = [];
    },
    setChosenSubtypeId( state, action: PayloadAction<{ id: number }> ) {
      state.chosenProductSubTypesId.push( action.payload.id );
    },
    removeChosenSubtypeId( state, action: PayloadAction<{ id: number }> ) {
      state.chosenProductSubTypesId = state.chosenProductSubTypesId.filter( subtype => subtype !== action.payload.id );
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

export const productTypes = slice.reducer;
export const {
  setChosenProductTypeId,
  removeChosenProductTypeId,
  setChosenSubtypeId,
  removeChosenSubtypeId,
} = slice.actions;
