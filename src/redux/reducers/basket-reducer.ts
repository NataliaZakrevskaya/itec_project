import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from './products-reducer';

export const slice = createSlice( {
  name: 'basket',
  initialState: {
    productsInBasket: [] as Array<ProductItemType>,
    totalProductsCount: 0 as number,
    totalSum: 0 as number,
  },
  reducers: {
    setProductToBasket( state, action: PayloadAction<{ product: ProductItemType }> ) {
      state.productsInBasket.push( action.payload.product );
      state.totalProductsCount = state.productsInBasket.length;
    },
    removeProductFromBasket( state, action: PayloadAction<{ id: number }> ) {
      state.productsInBasket = state.productsInBasket.filter( product => product.id !== action.payload.id );
      state.totalProductsCount = state.productsInBasket.length;
    },
  },
} );

export const basketReducer = slice.reducer;
export const { setProductToBasket, removeProductFromBasket } = slice.actions;