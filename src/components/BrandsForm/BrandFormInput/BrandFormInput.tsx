import React from 'react';
import { useDispatch } from 'react-redux';
import { removeChosenBrandId, setChosenBrandId } from '../../../redux/reducers/brands';
import { BrandFormInputPropsType } from '../types';

const BrandFormInput = React.memo( ( { id, name, chosen }: BrandFormInputPropsType ) => {
  const dispatch = useDispatch();

  const addBrandStatusChosen = () => {
    dispatch( setChosenBrandId( { id } ) );
  };
  const removeBrandStatusChosen = () => {
    dispatch( removeChosenBrandId( { id } ) );
  };

  return (
    <label>
      <div>
        <input type="checkbox" checked={ chosen } onChange={ () => false }/>
        { chosen
          ? <span onClick={ removeBrandStatusChosen }/>
          : <span onClick={ addBrandStatusChosen }/>
        }
        { name }
      </div>
    </label>
  );
} );

export default BrandFormInput;
