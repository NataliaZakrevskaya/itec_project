import { AppRootStateType } from '../store';

export const getPopularProducts = ( state: AppRootStateType ) => {
  return state.popularProducts.results;
};