import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from '../../mocks';

export const slice = createSlice( {
  name: 'previouslyProducts',
  initialState: {
    previouslyProducts: [] as Array<ProductItemType>,
  },
  reducers: {
    setProductToBlock( state, action: PayloadAction<{ product: ProductItemType }> ) {
      state.previouslyProducts.unshift( action.payload.product );
    },
  },
} );

export const previouslyProductsReducer = slice.reducer;
export const { setProductToBlock } = slice.actions;
