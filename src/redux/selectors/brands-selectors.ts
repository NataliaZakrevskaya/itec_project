import { AppRootStateType } from '../store';
import { BrandType } from '../reducers/brands-reducer';

export const getBrands = (state: AppRootStateType): Array<BrandType> => {
  return state.brands.brands
}
export const getChosenBrandsId = (state: AppRootStateType): Array<number> => {
  return state.brands.chosenBrandsId
}
/*export const getBrandName = (state: AppRootStateType): string => {
  return state.brands.brandName
}*/
/*export const getFilteredBrands = (state: AppRootStateType): Array<BrandType> => {
  return state.brands.filteredBrands
}*/
