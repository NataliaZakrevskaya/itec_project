import React from 'react';
import { useDispatch } from 'react-redux';
import { removeChosenBrandId, setChosenBrandId } from '../../../redux/reducers/brands-reducer';

const BrandFormInput = ( { id, name, chosen }: BrandFormInputPropsType ) => {
  const dispatch = useDispatch();
  const addBrandStatusChosen = () => {
    dispatch( setChosenBrandId( { id } ) );
  };
  const removeBrandStatusChosen = () => {
    dispatch( removeChosenBrandId( { id } ) );
  };

  return (
    <label>
      <input type="checkbox" checked={ chosen }/>
      { chosen
        ? <span onClick={ removeBrandStatusChosen }/>
        : <span onClick={ addBrandStatusChosen }/>
      }
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