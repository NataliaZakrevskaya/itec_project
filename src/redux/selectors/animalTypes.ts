import { AppRootStateType } from '../store';
import { AnimalTypesType } from '../../types';

export const getChosenAnimalTypeId = ( state: AppRootStateType ): number | null => {
  return state.animalTypes.chosenAnimalTypeId;
};
export const getAnimalTypes = ( state: AppRootStateType ): Array<AnimalTypesType> => {
  return state.animalTypes.animalTypes;
};