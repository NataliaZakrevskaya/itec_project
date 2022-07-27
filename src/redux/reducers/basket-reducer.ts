import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from './products-reducer';
import { setTotalCount, setTotalSum } from './helpers';

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
    incrementProductQuantity( state, action: PayloadAction<{ optionId: number }> ) {
      const index = state.productsInBasket.findIndex( product => {
        if ( product.chosen_option ) return product.chosen_option.id === action.payload.optionId;
        return product.options[ 0 ].id === action.payload.optionId;
      } );
      if ( state.productsInBasket[ index ].chosen_option ) {
        // @ts-ignore
        state.productsInBasket[ index ].chosen_option.quantity = state.productsInBasket[ index ].chosen_option.quantity + 1;
      } else {
        state.productsInBasket[ index ].options[ 0 ].quantity = state.productsInBasket[ index ].options[ 0 ].quantity + 1;
      }
      setTotalCount( state );
      setTotalSum( state );
    },
    decrementProductQuantity( state, action: PayloadAction<{ optionId: number }> ) {
      const index = state.productsInBasket.findIndex( product => {
        if ( product.chosen_option ) return product.chosen_option.id === action.payload.optionId;
        return product.options[ 0 ].id === action.payload.optionId;
      } );
      if ( state.productsInBasket[ index ].chosen_option ) {
        // @ts-ignore
        state.productsInBasket[ index ].chosen_option.quantity = state.productsInBasket[ index ].chosen_option.quantity - 1;
      } else {
        state.productsInBasket[ index ].options[ 0 ].quantity = state.productsInBasket[ index ].options[ 0 ].quantity - 1;
      }
      setTotalCount( state );
      setTotalSum( state );
    },
    removeWithoutChosenOptionId( state, action: PayloadAction<{ optionId: number }> ) {
      state.productsInBasket = state.productsInBasket.filter( product => product.options[0].id !== action.payload.optionId );
      setTotalCount( state );
      setTotalSum( state );
    },
    removeByChosenOptionId( state, action: PayloadAction<{ optionId: number }> ) {
      state.productsInBasket = state.productsInBasket.filter( product => product.chosen_option?.id !== action.payload.optionId );
      setTotalCount( state );
      setTotalSum( state );
    },
  },
} );

export const basketReducer = slice.reducer;
export const {
  setProductToBasket,
  removeWithoutChosenOptionId,
  removeByChosenOptionId,
  incrementProductQuantity,
  decrementProductQuantity,
} = slice.actions;