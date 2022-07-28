import { instance } from '../configApi/configApi';
import { AxiosResponse, resProductItemType } from '../../mocks';
import { ORDER_URL } from './constants';

export const orderAPI = {
  async sendOrder( phoneNumber: string, customerName: string, orderInfo: Array<{
    article_number: string,
    quantity: number
  }> ) {
    return await instance.post<resProductItemType, AxiosResponse<resProductItemType>>( ORDER_URL, {
      customer: {
        phone_number: phoneNumber,
        customer_name: customerName,
      },
      items: orderInfo,
    } );
  },
};