import { instance } from '../config';
import { PRODUCT_TYPES_URL } from './constants';
import { ResProductType } from '../../types';

export const productTypesAPI = {
  async setProductTypes( animalId: number ) {
    return await instance.get<Array<ResProductType>>( `${ PRODUCT_TYPES_URL }/?animal=${ animalId }` );
  },
};

