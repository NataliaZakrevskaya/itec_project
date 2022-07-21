import { AppRootStateType } from '../store';

export const getLatestProducts = (state: AppRootStateType) => {
  return state.latestProducts.results
}