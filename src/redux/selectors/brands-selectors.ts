import { AppRootStateType } from '../store';
import { BrandType } from '../../mocks';

export const getBrands = (state: AppRootStateType): Array<BrandType> => {
  return state.brands.brands
}
export const getChosenBrandsId = (state: AppRootStateType): Array<number> => {
  return state.brands.chosenBrandsId
}