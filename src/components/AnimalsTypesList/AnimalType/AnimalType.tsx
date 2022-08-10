import React from 'react';
import style from './AnimalType.module.scss';
import { useDispatch } from 'react-redux';
import { setActualPage } from '../../../redux/reducers/products-reducer';
import { AnimalTypePropsType } from './types';

const AnimalType = ( { id, name, image, isActive, checked, chooseActiveAnimalType }: AnimalTypePropsType ) => {
  const dispatch = useDispatch();
  const onAnimalTypeClick = () => {
    const pageNumber = 1;
    chooseActiveAnimalType( id );
    dispatch( setActualPage( { pageNumber } ) );
  };
  return (
    <div
      className={ checked ? isActive ? `${ style.animalType } ${ style.active }` : `${ style.animalType } ${ style.restTypes }` : style.animalType }
      onClick={ onAnimalTypeClick }>
      <div className={ style.animalTypeImageWrapper }>
        <img src={ image } alt={ 'animal img' }/>
      </div>
      <span>{ name }</span>
    </div>
  );
};

export default AnimalType;
