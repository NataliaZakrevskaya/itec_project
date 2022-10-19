import React from 'react';
import { AnimalTypeInputPropsType } from './types';
import style from '../../ProductTypesForm/ProductTypesForm.module.scss';

const AnimalTypeInput = React.memo( ( { id, name, isActive, chooseAnimalType }: AnimalTypeInputPropsType ) => {

  return (
    <label className={ style.categoryContainer }>
      <div>
        <input type="radio" checked={ isActive } value={ name } onChange={ () => chooseAnimalType( id ) }/>
        <span/>
        { name }
      </div>
    </label>
  );
} );

export default AnimalTypeInput;