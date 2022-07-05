import { instance } from '../configApi/configApi';
import { ANIMALS_URL } from './constants';
import { AnimalTypesType } from '../../mocks';

export const animalTypesAPI = {
  async setAnimalTypes() {
    return await instance.get<Array<AnimalTypesType>>(ANIMALS_URL)
  }
}