import React, { ReactElement, useCallback, useEffect } from 'react';
import style from '../ProductTypesForm/ProductTypesForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setActualPage } from '../../redux/reducers/products';
import { AppDispatch } from '../../redux/store';
import { getAnimalTypes, getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { fetchAnimalTypesTC, setChosenAnimalTypeId } from '../../redux/reducers/animalTypes';
import AnimalTypeInput from './AnimalTypeInput/AnimalTypeInput';

const ChooseAnimalTypeForm = React.memo( ( { forBurger }: { forBurger: boolean } ): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const animalTypes = useSelector( getAnimalTypes );
  const chosenChosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const chooseAnimalTypeId = useCallback( ( id: number ) => {
    dispatch( setChosenAnimalTypeId( { id } ) );
    dispatch( setActualPage( { pageNumber: 1 } ) );
  }, [ dispatch ] );
  useEffect( () => {
    if ( !animalTypes )
      dispatch( fetchAnimalTypesTC() );
  }, [ dispatch ] );

  return (
    <div className={ forBurger ? `${ style.productTypesBlock } ${ style.forBurger }` : style.productTypesBlock }>
      <h2>Выберите животного</h2>
      <div className={ style.radioGroup }>
        {
          animalTypes.map( ( { id, name } ) =>
            <AnimalTypeInput
              key={ id }
              id={ id }
              name={ name }
              isActive={ chosenChosenAnimalTypeId === id }
              chooseAnimalType={ chooseAnimalTypeId }
            />,
          )
        }
      </div>
    </div>
  );
} );

export default ChooseAnimalTypeForm;
