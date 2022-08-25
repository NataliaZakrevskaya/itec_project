import { ACCOMPANYING_PRODUCTS_URL, PRODUCTS_URL } from './constants';
import { instance } from '../config';
import { ProductItemType, responseProductItemType } from '../../types';
import { AxiosResponse } from '../types';
import { PageSize } from './enums';

export const productsAPI = {
  async setProducts( animal: number | null, category: number | null, brands?: string | null, page?: number, ordering?: string ) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, {
      params: {
        page,
        page_size: PageSize.CATALOG,
        animal,
        category,
        ordering,
        brand: brands,
      },
    } );
  },
  async setProductsByName( search?: string ) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, { params: { search } } );
  },
  async setProductsByOrdering( ordering?: string ) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, {
      params: {
        ordering,
        page_size: PageSize.BLOCK,
      },
    } );
  },
  async setPopularProducts( ordering?: string, animal?: number | null ) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, {
      params: {
        ordering,
        animal,
        page_size: PageSize.BLOCK,
      },
    } );
  },
  async setAccompanyingProducts( productId: number ) {
    return await instance.get<Array<ProductItemType>>( `${ PRODUCTS_URL }/${ productId }/${ ACCOMPANYING_PRODUCTS_URL }` );
  },
};