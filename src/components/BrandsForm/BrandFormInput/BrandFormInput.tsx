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

  const showDiscount = true; //todo позже получать от бэка

  return (
    <label>
      <div>
      <input type="checkbox" checked={ chosen }/>
      { chosen
        ? <span onClick={ removeBrandStatusChosen }/>
        : <span onClick={ addBrandStatusChosen }/>
      }
      { name }
      </div>
      <p>Акция</p>
    </label>
  );
};

export default BrandFormInput;

type BrandFormInputPropsType = {
  id: number
  name: string,
  chosen: boolean
}