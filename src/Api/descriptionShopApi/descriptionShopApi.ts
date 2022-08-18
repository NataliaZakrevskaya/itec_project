import { instance } from '../config';
import { SHOP_INFO } from './constants';
import { ShopInfoType } from '../../types';
import { AxiosResponse } from '../types';

export const descriptionShopAPI = {
  async setShopInfo() {
    return await instance.get<ShopInfoType, AxiosResponse<ShopInfoType>>( SHOP_INFO );
  },
};