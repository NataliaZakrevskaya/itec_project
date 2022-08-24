import { instance, postInstance } from '../config';
import { REVIEWS_URL } from './constants';
import { ResBrandType } from '../../types';

export const reviewsAPI = {
  async setReviews() {
    return await instance.get<Array<ResBrandType>>( REVIEWS_URL );
  },
  async sendReview( nameAuthor: string, phoneNumber: string, nameAnimal: string, bodyOfComment: string ) {
    return await postInstance.post( REVIEWS_URL, {
      name_author: nameAuthor,
      phone_number: phoneNumber,
      name_animal: nameAnimal,
      body_of_comment: bodyOfComment,
    } );
  },
};
