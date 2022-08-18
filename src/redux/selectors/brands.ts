import { AppRootStateType } from '../store';
import { BrandType } from '../../types';

export const getBrands = ( state: AppRootStateType ): Array<BrandType> => state.brands.brands;
export const getChosenBrandsId = ( state: AppRootStateType ): Array<number> => state.brands.chosenBrandsId;
