import { instance } from '../config';
import { PRODUCT_TYPES_URL } from './constants';
import { ResBrandType } from '../../types';

export const productTypesAPI = {
  async setProductTypes() {
    return await instance.get<Array<ResBrandType>>( PRODUCT_TYPES_URL );
  },
};

