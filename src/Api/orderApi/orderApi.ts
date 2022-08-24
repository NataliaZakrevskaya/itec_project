import { postInstance } from '../config';
import { CALLBACK_URL, ORDER_URL } from './constants';
import { DiscountType } from '../../types';

export const orderAPI = {
  async sendOrder( customerName: string, phoneNumber: string, orderInfo: any, discountForBasket: Array<DiscountType> ) {
    return await postInstance.post( ORDER_URL, {
      customer_name: customerName,
      phone_number: phoneNumber,
      orderInfo,
      discountForBasket,
    } );
  },
  async sendCallbackRequest( customerName: string, phoneNumber: string ) {
    return await postInstance.post( CALLBACK_URL, {
      customer_name: customerName,
      phone_number: phoneNumber,
    } );
  },
};