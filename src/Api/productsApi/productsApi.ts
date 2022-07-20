import { PRODUCTS_URL } from './constants';
import { instance } from '../configApi/configApi';
import { AxiosResponse, responseProductItemType, resProductItemType } from '../../mocks';

export const productsAPI = {
  async setProducts(page: number, ordering: string, page_size?: number, animal?: number, category?: number, search?: string) {
    return await instance.get<responseProductItemType, AxiosResponse<responseProductItemType>>(PRODUCTS_URL, { params: {page, page_size: 15, animal, category, search, ordering } })
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