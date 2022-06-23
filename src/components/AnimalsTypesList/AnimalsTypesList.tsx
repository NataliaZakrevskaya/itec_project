import React from 'react';
import commonStyle from '../../styles/common/Container.module.scss';
import { getAnimalTypes } from '../../mocks';
import AnimalType from './AnimalType/AnimalType';
import style from "./AnimalsTypesList.module.scss";

const AnimalsTypesList = () => {

  const animalTypes = getAnimalTypes(); // todo позже будет запрос на сервер

  return (
    <div className={ `${ commonStyle.container } ${style.animalTypesBlock}`}>
      { animalTypes.map( (type: any) =>
        <AnimalType key={type.id} name={type.name} img={type.img}/>,
      ) }
    </div>
  );
};

export default AnimalsTypesList;

export type AnimalPropsType = {
  id?: number,
  name: string,
  img: string
}