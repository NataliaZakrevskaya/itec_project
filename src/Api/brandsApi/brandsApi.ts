import { instance } from '../config';
import { BRANDS_URL } from './constants';
import { ResBrandType } from '../../types';

export const brandsAPI = {
  async setBrands() {
    return await instance.get<Array<ResBrandType>>( BRANDS_URL );
  },
};