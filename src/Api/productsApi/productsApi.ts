import { PRODUCTS_URL } from './constants';
import { instance } from '../configApi/configApi';
import { AxiosResponse, responseProductItemType, resProductItemType } from '../../mocks';

export const productsAPI = {
  async setProducts( page?: number, ordering?: string, page_size?: number, animal?: number, category?: number, brands?: any ) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, {
      params: {
        page,
        page_size,
        animal,
        category,
        ordering,/*, brands*/
      },
    } );
  },
  async setProductsByName( search?: string ) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, { params: { search } } );
  },
  async setProductsByOrdering( ordering?: string ) {
    const page_size = 12;
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, {
      params: {
        ordering,
        page_size,
      },
    } );
  },
  async setPopularProducts( ordering?: string, animal?: number ) {
    const page_size = 12;
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>( PRODUCTS_URL, {
      params: {
        ordering,
        animal,
        page_size,
      },
    } );
  },
  async setWithThisProductByProducts() {
    return await instance.get<Array<resProductItemType>>( PRODUCTS_URL ); // todo в параметрах передавать
  },
  async setPopularProductsTC() {
    return await instance.get<Array<resProductItemType>>( PRODUCTS_URL ); // todo в параметрах передавать
  },

};