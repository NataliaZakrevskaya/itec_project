import { instance } from '../config';
import { AxiosResponse, ShopInfoType } from '../../mocks';
import { SHOP_INFO } from './constants';

export const descriptionShopAPI = {
  async setShopInfo() {
    return await instance.get<ShopInfoType, AxiosResponse<ShopInfoType>>( SHOP_INFO );
  },
};