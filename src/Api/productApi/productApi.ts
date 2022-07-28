import { instance } from '../configApi/configApi';
import { AxiosResponse, resProductItemType } from '../../mocks';
import { PRODUCTS_URL } from '../productsApi/constants';

export const productAPI = {
  async setProduct( productId: number ) {
    return await instance.get<resProductItemType, AxiosResponse<resProductItemType>>( `${ PRODUCTS_URL }/${ productId }` );
  },
};