import React from 'react';
import { useDispatch } from 'react-redux';
import { removeChosenBrandId, setChosenBrandId } from '../../../redux/reducers/brands-reducer';
import { BrandFormInputPropsType } from '../types';

const BrandFormInput = ( { id, name, chosen }: BrandFormInputPropsType ) => {
  const dispatch = useDispatch();

  const showDiscount = true; //todo позже получать от бэка

  const addBrandStatusChosen = () => {
    dispatch( setChosenBrandId( { id } ) );
  };
  const removeBrandStatusChosen = () => {
    dispatch( removeChosenBrandId( { id } ) );
  };

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
      { showDiscount && <p>Акция</p> }
    </label>
  );
};

export default BrandFormInput;
