import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductInitState } from '../../mocks';
import { RequestStatus } from './enums';
import { setOneClickOrderRequestStatus } from './app';
import { orderAPI } from '../../Api/orderApi';
import { OneProductItemType, OptionType, ProductItemType } from '../../types';

export const sendOneClickOrderTC = createAsyncThunk(
  'oneClickOrder/sendOneClickOrder', async ( param: {
    name: string, phoneNumber: string, orderInfo: ProductItemType | OneProductItemType }, {
                                               dispatch,
                                               rejectWithValue,
                                             } ) => {
    try {
      await orderAPI.sendOrder( param.name, param.phoneNumber, param.orderInfo );
      dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.SUCCEEDED } ) );
    } catch ( err ) {
      dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);

export const slice = createSlice( {
  name: 'oneClickOrder',
  initialState: getProductInitState() as OneProductItemType | ProductItemType,
  reducers: {
    setProductToState( state, action: PayloadAction<{ product: ProductItemType | OneProductItemType }> ) {
      return action.payload.product;
    },
    setChosenOptionToOneOrderProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      state.chosen_option = action.payload.option;
    },
    incrementOneOrderProductQuantity( state, action: PayloadAction<{ quantity: number }> ) {
      state.chosen_option.quantity = state.chosen_option.quantity + action.payload.quantity;
    },
    decrementOneOrderProductQuantity( state, action: PayloadAction<{ quantity: number }> ) {
      state.chosen_option.quantity = state.chosen_option.quantity - action.payload.quantity;
    },
  },
} );

export const oneClickOrder = slice.reducer;
export const {
  setProductToState,
  setChosenOptionToOneOrderProduct,
  incrementOneOrderProductQuantity,
  decrementOneOrderProductQuantity,
} = slice.actions;