import React from 'react';
import { AnimalPropsType } from '../AnimalsTypesList';
import style from './AnimalType.module.scss';

const AnimalType = ( props: AnimalPropsType ) => {
  return (
    <div className={ style.animalType }>
      <img src={ props.img } alt={ 'animal img' }/>
      <span>{ props.name }</span>
    </div>
  );
};

export default AnimalType;