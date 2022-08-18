import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionType, ProductItemType } from '../../types';

export const slice = createSlice( {
  name: 'previouslyProducts',
  initialState: {
    previouslyProducts: [] as Array<ProductItemType>,
  },
  reducers: {
    setProductToBlock( state, action: PayloadAction<{ product: ProductItemType }> ) {
      state.previouslyProducts.unshift( action.payload.product );
    },
    setChosenOptionToPreviouslyProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.previouslyProducts.findIndex( product => product.id === action.payload.productId );
      state.previouslyProducts[ index ].chosen_option = action.payload.option;
    },
  },
} );

export const previouslyProducts = slice.reducer;
export const { setProductToBlock, setChosenOptionToPreviouslyProduct } = slice.actions;
