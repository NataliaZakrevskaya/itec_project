import { instance } from '../config';
import { DISCOUNTS_URL } from './constants';
import { DiscountType } from '../../types';

export const discountsAPI = {
  async setDiscountTypes() {
    return await instance.get<Array<DiscountType>>(DISCOUNTS_URL);
  }
}