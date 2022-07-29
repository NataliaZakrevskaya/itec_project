import { instance } from '../configApi/configApi';
import { ResBrandType } from '../../mocks';
import { REVIEWS_URL } from './constants';

export const reviewsAPI = {
  async setReviews() {
    return await instance.get<Array<ResBrandType>>( REVIEWS_URL );
  },
  async sendReview( nameAuthor: string, phoneNumber: string, nameAnimal: string, bodyOfComment: string ) {
    return await instance.post( REVIEWS_URL, {
      name_author: nameAuthor,
      phone_number: phoneNumber,
      name_animal: nameAnimal,
      body_of_comment: bodyOfComment,
    } );
  },
};
