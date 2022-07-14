import React from 'react';
import style from './AnimalType.module.scss';

const AnimalType = ( { id, name, image, isActive, checked, chooseActiveAnimalType }: AnimalTypePropsType ) => {
  return (
    <div
      className={ checked ? isActive ? `${ style.animalType } ${ style.active }` : `${ style.animalType } ${ style.restTypes }` : style.animalType }
      onClick={ () => chooseActiveAnimalType( id ) }>
      <div className={style.animalTypeImageWrapper}>
        <img src={ image } alt={ 'animal img' }/>
      </div>
      <span>{ name }</span>
    </div>
  );
};

export default AnimalType;

type AnimalTypePropsType = {
  id: number,
  name: string,
  image: string,
  isActive: boolean,
  checked: boolean
  chooseActiveAnimalType: ( id: number ) => void
}