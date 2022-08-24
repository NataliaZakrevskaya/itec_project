import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from './enums';
import { setOneClickOrderRequestStatus } from './app';
import { orderAPI } from '../../Api/orderApi';
import { DiscountType, OneProductItemType, OptionType, ProductItemType } from '../../types';
import { setTotalCount, setTotalSum, setTotalSumWithDiscount } from './helpers';
import { OrderInfoType } from '../../types/order';

export const sendOneClickOrderTC = createAsyncThunk(
  'oneClickOrder/sendOneClickOrder', async ( param: {
    name: string, phoneNumber: string, orderInfo: OrderInfoType, discountForBasket: Array<DiscountType>
  }, {
                                               dispatch,
                                               rejectWithValue,
                                             } ) => {
    try {
      await orderAPI.sendOrder( param.name, param.phoneNumber, param.orderInfo, param.discountForBasket );
      dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.SUCCEEDED } ) );
    } catch ( err ) {
      dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);

export const slice = createSlice( {
  name: 'oneClickOrder',
  initialState: {
    productsInBasket: [] as Array<ProductItemType | OneProductItemType>,
    totalProductsCount: 0 as number,
    totalSum: 0 as number,
    totalSumWithDiscount: 0 as number,
  }
  /*getProductInitState() as OneProductItemType | ProductItemType*/,
  reducers: {
    setProductToState( state, action: PayloadAction<{ product: ProductItemType | OneProductItemType, basketDiscount: DiscountType }> ) {
      state.productsInBasket = [];
      state.productsInBasket.unshift( action.payload.product );
      setTotalSumWithDiscount( state, action.payload.basketDiscount );
      setTotalCount( state );
      setTotalSum( state );
    },
    setChosenOptionToOneOrderProduct( state, action: PayloadAction<{ option: OptionType, basketDiscount: DiscountType }> ) {

      state.productsInBasket[ 0 ].chosen_option = action.payload.option;
      setTotalSum( state );
      setTotalSumWithDiscount( state, action.payload.basketDiscount );
      setTotalCount( state );
    },
    incrementOneOrderProductQuantity( state, action: PayloadAction<{ quantity: number, basketDiscount: DiscountType }> ) {
      state.productsInBasket[ 0 ].chosen_option.quantity = state.productsInBasket[ 0 ].chosen_option.quantity + action.payload.quantity;

      setTotalSum( state );
      setTotalSumWithDiscount( state, action.payload.basketDiscount );
      setTotalCount( state );
    },
    decrementOneOrderProductQuantity( state, action: PayloadAction<{ quantity: number, basketDiscount: DiscountType }> ) {
      state.productsInBasket[ 0 ].chosen_option.quantity = state.productsInBasket[ 0 ].chosen_option.quantity - action.payload.quantity;

      setTotalSum( state );
      setTotalSumWithDiscount( state, action.payload.basketDiscount );
      setTotalCount( state );
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