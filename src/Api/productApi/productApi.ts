import { instance } from '../config';
import { PRODUCTS_URL } from '../productsApi';
import { OneProductItemType } from '../../types';
import { AxiosResponse } from '../types';

export const productAPI = {
  async setProduct( productId: number ) {
    return await instance.get<OneProductItemType, AxiosResponse<OneProductItemType>>( `${ PRODUCTS_URL }/${ productId }` );
  },
};