import { instance } from '../configApi/configApi';
import { PRODUCT_TYPES_URL } from './constants';
import { ResBrandType } from '../../mocks';

export const productTypesAPI = {
  async setProductTypes() {
    return await instance.get<Array<ResBrandType>>( PRODUCT_TYPES_URL );
  },
};

