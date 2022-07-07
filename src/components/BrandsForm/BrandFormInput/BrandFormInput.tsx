import React from 'react';
import { useDispatch } from 'react-redux';
import { removeChosenBrandId, setChosenBrandId } from '../../../redux/reducers/brands-reducer';

const BrandFormInput = ( { id, name, chosen }: BrandFormInputPropsType ) => {

  const dispatch = useDispatch();
  const brandFormInputHandler = () => {
    if ( chosen ) {
      dispatch( removeChosenBrandId( { id } ) );
    }
    dispatch( setChosenBrandId( { id } ) );
  };

  return (
    <label>
      <input type="checkbox" checked={ chosen } onChange={ brandFormInputHandler }/>
      <span/>
      { name }
    </label>
  );
};

export default BrandFormInput;

type BrandFormInputPropsType = {
  id: number
  name: string,
  chosen: boolean
}