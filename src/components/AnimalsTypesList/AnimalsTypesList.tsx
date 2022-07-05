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

const AnimalsTypesList = () => {

  const animalTypes = useSelector(getAnimalTypes);
  const activeAnimalTypeId = useSelector(getChosenAnimalTypeId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAnimalTypesTC())
  }, [])

  const chooseActiveAnimalType = (id: number) => {
    dispatch(setChosenAnimalTypeId({id}))
    navigate(routesPathsEnum.CATALOG)
  }



  return (
    <div className={ `${ commonStyle.container } ${style.animalTypesBlock}`}>
      { animalTypes.map( (type: AnimalTypesType) =>
        <AnimalType
          key={type.id}
          id={type.id}
          name={type.name}
          image={type.image}
          isActive={activeAnimalTypeId === type.id}
          checked={!!activeAnimalTypeId || activeAnimalTypeId === 0}
          chooseActiveAnimalType={chooseActiveAnimalType}
        />,
      ) }
    </div>
  );
};

export default AnimalsTypesList;
