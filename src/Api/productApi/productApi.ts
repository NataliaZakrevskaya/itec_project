import { instance } from '../configApi/configApi';
import { AxiosResponse, ProductItemType } from '../../mocks';
import { PRODUCTS_URL } from '../productsApi/constants';

export const productAPI = {
  async setProduct( productId: number ) {
    return await instance.get<ProductItemType, AxiosResponse<ProductItemType>>( `${ PRODUCTS_URL }/${ productId }` );
  },
};