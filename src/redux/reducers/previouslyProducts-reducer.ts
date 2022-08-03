import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimalTypesType, OptionType } from '../../mocks';

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

export type ProductItemType = {
  id: number,
  name: string,
  animal: Array<AnimalTypesType>
  images: Array<{ id: number, image: string }>,
  description: string,
  features: string,
  composition: string,
  additives: string,
  analysis: string,
  brand: { id: number, name: string, image: string },
  category: { id: number, name: string, is_active: boolean, },
  options: Array<OptionType>,
  chosen_option: OptionType
}