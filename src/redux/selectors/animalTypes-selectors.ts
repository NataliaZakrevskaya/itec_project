import { AppRootStateType } from '../store';
import { AnimalTypesType } from '../../mocks';

export const getChosenAnimalTypeId = ( state: AppRootStateType ): number | null => {
  return state.animalTypes.chosenAnimalTypeId;
};
export const getAnimalTypes = ( state: AppRootStateType ): Array<AnimalTypesType> => {
  return state.animalTypes.animalTypes;
};