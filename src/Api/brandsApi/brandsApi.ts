import { instance } from '../configApi/configApi';
import { BRANDS_URL } from './constants';
import { ResBrandType } from '../../mocks';

export const brandsAPI = {
  async setBrands() {
    return await instance.get<Array<ResBrandType>>(BRANDS_URL)
  }
}