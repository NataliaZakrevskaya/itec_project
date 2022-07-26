import { PRODUCTS_URL } from './constants';
import { instance } from '../configApi/configApi';
import { AxiosResponse, responseProductItemType, resProductItemType } from '../../mocks';

export const productsAPI = {
  async setProducts( animal: number | null, category: number | null, page?: number, ordering?: string, brands?: any ) {
    const page_size = 15;
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
  async setPopularProducts( ordering?: string, animal?: number | null ) {
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
};