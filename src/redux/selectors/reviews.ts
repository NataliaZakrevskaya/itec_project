import { AppRootStateType } from '../store';

export const getReviews = ( state: AppRootStateType ) => {
  return state.reviews.reviews;
};