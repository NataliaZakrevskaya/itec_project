import React from 'react';
import style from './AnimalType.module.scss';
import { AnimalTypesType } from '../../../mocks';

const AnimalType = ( { type, name, image, isActive, checked, setActiveAnimalTypeId }: AnimalTypePropsType ) => {
  return (
    <div className={checked ? isActive ? `${style.animalType} ${style.active}` : `${style.animalType} ${style.restTypes}` : style.animalType}
         onClick={ () => setActiveAnimalTypeId(type) }>
      <img src={ image } alt={ 'animal img' }/>
      <span>{ name }</span>
    </div>
  );
};

export default AnimalType;

type AnimalTypePropsType = {
  type: AnimalTypesType,
  name: string,
  image: string,
  isActive: boolean,
  checked: boolean
  setActiveAnimalTypeId: (type: AnimalTypesType) => void
}