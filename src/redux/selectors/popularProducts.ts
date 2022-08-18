import { AppRootStateType } from '../store';

export const getPopularProducts = ( state: AppRootStateType ) => state.popularProducts.results;
