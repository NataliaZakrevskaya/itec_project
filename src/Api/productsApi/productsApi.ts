import { PRODUCTS_URL } from './constants';
import { instance } from '../configApi/configApi';
import { AxiosResponse, responseProductItemType, resProductItemType } from '../../mocks';

export const productsAPI = {
  async setProducts(page?: number, ordering?: string, page_size?: number, animal?: number, category?: number) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>(PRODUCTS_URL, { params: {page, page_size, animal, category, ordering } })
  },
  async setProductsByName(search?: string) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>(PRODUCTS_URL, { params: {search } })
  },
  async setWithThisProductByProducts() {
    return await instance.get<Array<resProductItemType>>(PRODUCTS_URL) // todo в параметрах передавать
  },
  async setPopularProductsTC() {
    return await instance.get<Array<resProductItemType>>(PRODUCTS_URL) // todo в параметрах передавать
  },
  async setLatestProductsTC() {
    return await instance.get<Array<resProductItemType>>(PRODUCTS_URL) // todo в параметрах передавать
  },
}