import React from 'react';
import style from './AnimalType.module.scss';
import { useDispatch } from 'react-redux';
import { setActualPage } from '../../../redux/reducers/products';
import { AnimalTypePropsType } from './types';

const AnimalType = React.memo(( { id, name, image, isActive, checked, chooseActiveAnimalType, sixTypes }: AnimalTypePropsType ) => {
  const dispatch = useDispatch();
  const onAnimalTypeClick = () => {
    const pageNumber = 1;
    chooseActiveAnimalType( id );
    dispatch( setActualPage( { pageNumber } ) );
  };
  return (
    <div
      className={ !sixTypes ? checked ? isActive ? `${ style.animalType } ${ style.active }` : `${ style.animalType } ${ style.restTypes }` : style.animalType6 : checked ? isActive ? `${ style.animalType6 } ${ style.active }` : `${ style.animalType6 } ${ style.restTypes }` : style.animalType6 }
      onClick={ onAnimalTypeClick }>
      <div className={ style.animalTypeImageWrapper }>
        <img src={ image } loading={'lazy'} alt={ 'animal img' } draggable="false"/>
      </div>
      <span>{ name }</span>
    </div>
  );
});

export default AnimalType;
