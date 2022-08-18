import { AppRootStateType } from '../store';
import { AnimalTypesType, Nullable } from '../../types';

export const getChosenAnimalTypeId = ( state: AppRootStateType ): Nullable<number> => state.animalTypes.chosenAnimalTypeId;
export const getAnimalTypes = ( state: AppRootStateType ): Array<AnimalTypesType> => state.animalTypes.animalTypes;
