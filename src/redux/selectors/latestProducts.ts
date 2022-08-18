import { AppRootStateType } from '../store';

export const getLatestProducts = ( state: AppRootStateType ) => state.latestProducts.results;
