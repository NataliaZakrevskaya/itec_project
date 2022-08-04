import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonStyle from '../../styles/common/Container.module.scss';
import { AnimalTypesType } from '../../mocks';
import AnimalType from './AnimalType/AnimalType';
import style from './AnimalsTypesList.module.scss';
import { fetchAnimalTypesTC, setChosenAnimalTypeId } from '../../redux/reducers/animalTypes-reducer';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { getAnimalTypes, getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { useCarousel } from '../../customHooks/useCarousel';
import { BlockNames } from '../../customHooks/enums';
import { AppDispatch } from '../../redux/store';

const AnimalsTypesList = () => {

  const animalTypes = useSelector( getAnimalTypes );
  const activeAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const {
    offset,
    onTouchStart,
    onTouchEnd,
    windowElRef,
  } = useCarousel( BlockNames.ANIMALS, animalTypes.length );
  console.log(offset);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect( () => {
    dispatch( fetchAnimalTypesTC() );
  }, [] );

  const chooseActiveAnimalType = ( id: number ) => {
    dispatch( setChosenAnimalTypeId( { id } ) );
    navigate( routesPathsEnum.CATALOG );
  };

  return (
    <div className={ commonStyle.container }>
      <div
        className={ style.window }
        ref={ windowElRef }
        onTouchStart={ onTouchStart }
        onTouchEnd={ onTouchEnd }
      >
        <div className={ style.animalTypesBlock }
             style={ {
               transform: `translateX(${ offset }px)`,
             } }>
          { animalTypes.map( ( type: AnimalTypesType ) =>
            <AnimalType
              key={ type.id }
              id={ type.id }
              name={ type.name }
              image={ type.image }
              isActive={ activeAnimalTypeId === type.id }
              checked={ !!activeAnimalTypeId || activeAnimalTypeId === 0 }
              chooseActiveAnimalType={ chooseActiveAnimalType }
            />,
          ) }
        </div>
      </div>
    </div>
  );
};

export default AnimalsTypesList;
