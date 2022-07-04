import { AppRootStateType } from '../store';
import { ProductTypesType } from '../reducers/productTypes-reducer';

export const getProductTypes = (state: AppRootStateType): Array<ProductTypesType> => {
  return state.productTypes.productTypes
}
export const getChosenProductTypeId = (state: AppRootStateType): number | null=> {
  return state.productTypes.chosenProductTypeId
}