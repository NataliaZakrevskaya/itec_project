import { instance } from '../configApi/configApi';
import { ResBrandType } from '../../mocks';
import { REVIEWS_URL } from './constants';

export const reviewsAPI = {
  async setReviews() {
    return await instance.get<Array<ResBrandType>>( REVIEWS_URL );
  },
};
