import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsTypes } from '../../mocks';

export const fetchProductTypesTC = createAsyncThunk(
  'productTypes/fetchProductTypes', ( param, { dispatch } ) => {
    const res = getProductsTypes(); //todo позже будет APi запрос
    try {
      return { productTypes: res };
    } catch ( err ) {

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
export const { setChosenProductTypeId } = slice.actions;

export type ProductTypesType = {
  id: number,
  name: string,
  is_active: boolean,
  chosen: boolean
}