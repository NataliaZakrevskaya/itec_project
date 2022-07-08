import { PRODUCTS_URL } from './constants';
import { instance } from '../configApi/configApi';
import { resProductItemType } from '../../mocks';

export const productsAPI = {
  async setProducts() {
    return await instance.get<Array<resProductItemType>>(PRODUCTS_URL)
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