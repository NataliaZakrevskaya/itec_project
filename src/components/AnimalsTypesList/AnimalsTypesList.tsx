import React from 'react';
import commonStyle from '../../styles/common/Container.module.scss';
import { AnimalTypesType, getAnimalTypes } from '../../mocks';
import AnimalType from './AnimalType/AnimalType';
import style from "./AnimalsTypesList.module.scss";

const AnimalsTypesList = () => {

  const animalTypes = getAnimalTypes(); // todo позже будет приходить из стора
  const activeAnimalType = getAnimalTypes()[0]// todo позже будет приходить из стора



  return (
    <div className={ `${ commonStyle.container } ${style.animalTypesBlock}`}>
      { animalTypes.map( (type: AnimalTypesType) =>
        <AnimalType key={type.id} name={type.name} image={type.image} isActive={activeAnimalType ? activeAnimalType?.id === type.id : false} checked={!!activeAnimalType}/>,
      ) }
    </div>
  );
};

export default AnimalsTypesList;
