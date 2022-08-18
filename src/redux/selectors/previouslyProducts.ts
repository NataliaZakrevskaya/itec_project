import { AppRootStateType } from '../store';

export const getPreviouslyProduct = ( state: AppRootStateType ) => {
  return state.previouslyProducts.previouslyProducts;
};