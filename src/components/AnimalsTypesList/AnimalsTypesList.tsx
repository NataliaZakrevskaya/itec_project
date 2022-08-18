import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './AnimalsTypesList.module.scss';
import { fetchAnimalTypesTC, setChosenAnimalTypeId } from '../../redux/reducers/animalTypes';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { getAnimalTypes, getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { useCarousel } from '../../customHooks/useCarousel';
import { BlockNames } from '../../customHooks/enums';
import { AppDispatch } from '../../redux/store';
import { AnimalTypesType } from '../../types';
import AnimalType from './AnimalType/AnimalType';

const AnimalsTypesList = React.memo(() => {

  const animalTypes = useSelector( getAnimalTypes );
  const activeAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const {
    offset,
    onTouchStart,
    onTouchEnd,
    windowElRef,
  } = useCarousel( BlockNames.ANIMALS, animalTypes.length );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect( () => {
    dispatch( fetchAnimalTypesTC() );
  }, [] );

  const chooseActiveAnimalType = useCallback(( id: number ) => {
    dispatch( setChosenAnimalTypeId( { id } ) );
    navigate( routesPathsEnum.CATALOG );
  }, []);

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
});

export default AnimalsTypesList;
