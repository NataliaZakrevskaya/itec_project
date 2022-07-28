import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from './products-reducer';
import { setTotalCount, setTotalSum } from './helpers';
import { OptionType } from '../../mocks';

export const slice = createSlice( {
  name: 'basket',
  initialState: {
    productsInBasket: [] as Array<ProductItemType>,
    totalProductsCount: 0 as number,
    totalSum: 0 as number,
  },
  reducers: {
    setProductToBasket( state, action: PayloadAction<{ product: ProductItemType }> ) {
      state.productsInBasket.unshift( action.payload.product );

      setTotalCount( state );
      setTotalSum( state );
    },
    incrementProductQuantity( state, action: PayloadAction<{ optionId: number, quantity: number }> ) {
      const index = state.productsInBasket.findIndex( product => product.chosen_option.id === action.payload.optionId);
        state.productsInBasket[ index ].chosen_option.quantity = state.productsInBasket[ index ].chosen_option.quantity + action.payload.quantity;

      setTotalCount( state );
      setTotalSum( state );
    },
    decrementProductQuantity( state, action: PayloadAction<{ optionId: number }> ) {
      const index = state.productsInBasket.findIndex( product => product.chosen_option.id === action.payload.optionId );
        state.productsInBasket[ index ].chosen_option.quantity = state.productsInBasket[ index ].chosen_option.quantity - 1;

      setTotalCount( state );
      setTotalSum( state );
    },
    removeByChosenOptionId( state, action: PayloadAction<{ optionId: number }> ) {
      state.productsInBasket = state.productsInBasket.filter( product => product.chosen_option.id !== action.payload.optionId );
      setTotalCount( state );
      setTotalSum( state );
    },
    changeChosenOption( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.productsInBasket.findIndex(product => product.id === action.payload.productId)
      state.productsInBasket[index].chosen_option = action.payload.option
      setTotalSum( state );
    },
  },
} );

export const basketReducer = slice.reducer;
export const {
  setProductToBasket,
  removeByChosenOptionId,
  incrementProductQuantity,
  decrementProductQuantity,
  changeChosenOption,
} = slice.actions;