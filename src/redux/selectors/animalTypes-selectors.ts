import { AppRootStateType } from '../store';
import { AnimalTypesType } from '../../mocks';

export const getActiveAnimalType = ( state: AppRootStateType ): AnimalTypesType | null => {
  return state.animalTypes.activeAnimalType;
};
export const getActiveAnimalTypeName = ( state: AppRootStateType ): string | undefined => {
  return state.animalTypes.activeAnimalType?.name;
};
export const getActiveAnimalTypeId = ( state: AppRootStateType ): number | undefined => {
  return state.animalTypes.activeAnimalType?.id;
};
export const getAnimalTypes = (state: AppRootStateType): Array<AnimalTypesType> => {
  return state.animalTypes.animalTypes
}