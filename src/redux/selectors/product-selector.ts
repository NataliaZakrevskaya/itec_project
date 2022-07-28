import { AppRootStateType } from '../store';

export const getProduct = (state: AppRootStateType) => {
  return state.product
}