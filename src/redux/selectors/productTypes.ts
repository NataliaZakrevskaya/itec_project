import { AppRootStateType } from '../store';
import { ProductTypesType } from '../reducers/types';
import { Nullable } from '../../types';

export const getProductTypes = ( state: AppRootStateType ): Array<ProductTypesType> => state.productTypes.productTypes;
export const getChosenProductTypeId = ( state: AppRootStateType ): Nullable<number> => state.productTypes.chosenProductTypeId;
