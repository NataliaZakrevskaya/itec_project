import { instance } from '../config';
import { ProductItemType } from '../../types';
import { PRODUCTS_URL } from '../productsApi';
import { ACCOMPANYING_PRODUCTS_URL } from './constants';

export const accompanyingProductsApi = {
  async setAccompanyingProducts( productId: number ) {
    return await instance.get<Array<ProductItemType>>( `${ PRODUCTS_URL }/${ productId }/${ ACCOMPANYING_PRODUCTS_URL }` );
  },
};