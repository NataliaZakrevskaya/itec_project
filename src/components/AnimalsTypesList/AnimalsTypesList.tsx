import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonStyle from '../../styles/common/Container.module.scss';
import { AnimalTypesType } from '../../mocks';
import AnimalType from './AnimalType/AnimalType';
import style from './AnimalsTypesList.module.scss';
import { fetchAnimalTypesTC, setActiveAnimalType } from '../../redux/reducers/animalTypes-reducer';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { getActiveAnimalTypeId, getAnimalTypes } from '../../redux/selectors/animalTypes-selectors';

const AnimalsTypesList = () => {

  const animalTypes = useSelector(getAnimalTypes);
  const activeAnimalTypeId = useSelector(getActiveAnimalTypeId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAnimalTypesTC())
  }, [])

  const setActiveAnimalTypeId = (type: AnimalTypesType) => {
    dispatch(setActiveAnimalType({type}))
    navigate(routesPathsEnum.CATALOG)
  }



  return (
    <div className={ `${ commonStyle.container } ${style.animalTypesBlock}`}>
      { animalTypes.map( (type: AnimalTypesType) =>
        <AnimalType
          key={type.id}
          type={type}
          name={type.name}
          image={type.image}
          isActive={activeAnimalTypeId === type.id}
          checked={!!activeAnimalTypeId || activeAnimalTypeId === 0}
          setActiveAnimalTypeId={setActiveAnimalTypeId}
        />,
      ) }
    </div>
  );
};

export default AnimalsTypesList;
