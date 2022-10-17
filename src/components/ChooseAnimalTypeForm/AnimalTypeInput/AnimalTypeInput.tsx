import React from 'react';
import { AnimalTypeInputPropsType } from './types';

const AnimalTypeInput = React.memo(( { id, name, isActive, chooseAnimalType }: AnimalTypeInputPropsType ) => {

  return (
    <label>
      <div>
        <input type="radio" checked={ isActive } value={ name } onChange={ () => chooseAnimalType( id ) }/>
        <span/>
        { name }
      </div>
    </label>
  );
});

export default AnimalTypeInput;