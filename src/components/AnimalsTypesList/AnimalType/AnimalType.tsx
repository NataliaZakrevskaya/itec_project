import React from 'react';
import style from './AnimalType.module.scss';
import { AnimalTypesPropsType } from './types';

const AnimalType = ( props: AnimalTypesPropsType ) => {
  return (
    <div className={ style.animalType }
         onClick={ () => alert( 'переход на каталог товаров для выбранного вида животного' ) }>
      <img src={ props.image } alt={ 'animal img' }/>
      <span>{ props.name }</span>
    </div>
  );
};

export default AnimalType;