import { instance } from '../config';
import { AxiosResponse, OneProductItemType } from '../../mocks';
import { PRODUCTS_URL } from '../productsApi/constants';

export const productAPI = {
  async setProduct( productId: number ) {
    return await instance.get<OneProductItemType, AxiosResponse<OneProductItemType>>( `${ PRODUCTS_URL }/${ productId }` );
  },
};