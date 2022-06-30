import React from 'react';
import commonStyle from '../../styles/common/Container.module.scss';
import { AnimalTypesType, getAnimalTypes } from '../../mocks';
import AnimalType from './AnimalType/AnimalType';
import style from "./AnimalsTypesList.module.scss";

const AnimalsTypesList = () => {

  const animalTypes = getAnimalTypes(); // todo позже будет запрос на сервер

  return (
    <div className={ `${ commonStyle.container } ${style.animalTypesBlock}`}>
      { animalTypes.map( (type: AnimalTypesType) =>
        <AnimalType key={type.id} name={type.name} image={type.image}/>,
      ) }
    </div>
  );
};

export default AnimalsTypesList;
