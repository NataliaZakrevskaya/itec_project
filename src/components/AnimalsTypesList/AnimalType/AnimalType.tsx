import React from 'react';
import style from './AnimalType.module.scss';

const AnimalType = ( { name, image, isActive, checked }: AnimalTypePropsType ) => {
  return (
    <div className={checked ? isActive ? `${style.animalType} ${style.active}` : `${style.animalType} ${style.restTypes}` : style.animalType}
         onClick={ () => alert( 'переход на каталог товаров для выбранного вида животного' ) }>
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