import { instance } from '../config';
import { ANIMALS_URL } from './constants';
import { AnimalTypesType } from '../../types';
import { AxiosResponse } from '../types';

export const animalTypesAPI = {
  async setAnimalTypes() {
    return await instance.get<Array<AnimalTypesType>,AxiosResponse<Array<AnimalTypesType>>>(ANIMALS_URL)
  }
}