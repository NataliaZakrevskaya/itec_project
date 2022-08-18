import { instance } from '../config';
import { CALLBACK_URL, ORDER_URL } from './constants';

export const orderAPI = {
  async sendOrder( customerName: string, phoneNumber: string, orderInfo: Array<{
    article_number: string,
    quantity: number
  }> ) {
    return await instance.post( ORDER_URL, {
      customer_name: customerName,
      phone_number: phoneNumber,
      items: orderInfo,
    } );
  },
  async sendCallbackRequest( customerName: string, phoneNumber: string ) {
    return await instance.post( CALLBACK_URL, {
      customer_name: customerName,
      phone_number: phoneNumber,
    } );
  },
};