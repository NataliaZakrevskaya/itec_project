import React from 'react';
import style from './AnimalType.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';

const AnimalType = ( { name, image, isActive, checked }: AnimalTypePropsType ) => {
  const navigate = useNavigate()
  return (
    <div className={checked ? isActive ? `${style.animalType} ${style.active}` : `${style.animalType} ${style.restTypes}` : style.animalType}
         onClick={ () => navigate(routesPathsEnum.CATALOG) }>
      <img src={ image } alt={ 'animal img' }/>
      <span>{ name }</span>
    </div>
  );
};

export default AnimalType;

type AnimalTypePropsType = {
  name: string,
  image: string,
  isActive: boolean,
  checked: boolean
}