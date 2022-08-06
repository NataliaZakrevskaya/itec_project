import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from './products-reducer';
import { setTotalCount, setTotalSum } from './helpers';
import { OptionType } from '../../mocks';
import { orderAPI } from '../../Api/orderApi/orderApi';
import { setCallbackRequestStatus, setOrderRequestStatus } from './app-reducer';
import { RequestStatus } from './enums';

export const sendOrderTC = createAsyncThunk(
  'order/sendOrder', async ( param: {
    name: string, phoneNumber: string, orderInfo: Array<{ article_number: string, quantity: number }>
  }, { dispatch, rejectWithValue } ) => {
    try {
      await orderAPI.sendOrder( param.name, param.phoneNumber, param.orderInfo );
      dispatch( setOrderRequestStatus( { status: RequestStatus.SUCCEEDED } ) );
      dispatch( clearBasket( {} ) );
    } catch ( err ) {
      dispatch( setOrderRequestStatus( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);
export const sendCallbackRequestTC = createAsyncThunk(
  'order/sendCallbackRequest', async ( param: {
    name: string, phoneNumber: string }, { dispatch, rejectWithValue } ) => {
    try {
      await orderAPI.sendCallbackRequest( param.name, param.phoneNumber );
      dispatch( setCallbackRequestStatus( { status: RequestStatus.SUCCEEDED } ) );
    } catch ( err ) {
      dispatch( setCallbackRequestStatus( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);

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
      const index = state.productsInBasket.findIndex( product => product.chosen_option.id === action.payload.optionId );
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
    removeByChosenOptionArticle( state, action: PayloadAction<{ article_number: string }> ) {
      state.productsInBasket = state.productsInBasket.filter( product => product.chosen_option.article_number !== action.payload.article_number );
      setTotalCount( state );
      setTotalSum( state );
    },
    changeChosenOption( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.productsInBasket.findIndex( product => product.id === action.payload.productId );
      state.productsInBasket[ index ].chosen_option = action.payload.option;
      setTotalSum( state );
    },
    changePartialProductQuantity(state, action: PayloadAction<{ optionId: number, quantity: number }> ) {
      const index = state.productsInBasket.findIndex( product => product.chosen_option.id === action.payload.optionId );
      state.productsInBasket[ index ].chosen_option.quantity = action.payload.quantity;

      setTotalSum( state );
    },
    clearBasket( state, action ) {
      state.productsInBasket = [];
      state.totalSum = 0;
      state.totalProductsCount = 0;
    },
  },
} );

export const basketReducer = slice.reducer;
export const {
  setProductToBasket,
  removeByChosenOptionArticle,
  incrementProductQuantity,
  decrementProductQuantity,
  changeChosenOption,
  changePartialProductQuantity,
  clearBasket,
} = slice.actions;