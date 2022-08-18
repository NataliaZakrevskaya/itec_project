import { instance } from '../config';
import { DiscountType } from '../../mocks';
import { DISCOUNTS_URL } from './constants';

export const discountsAPI = {
  async setDiscountTypes() {
    return await instance.get<Array<DiscountType>>(DISCOUNTS_URL);
  }
}