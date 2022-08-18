import { AppRootStateType } from '../store';

export const getReviews = ( state: AppRootStateType ) => state.reviews.reviews;
