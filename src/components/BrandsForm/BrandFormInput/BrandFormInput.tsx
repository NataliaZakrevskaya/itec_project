import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { removeChosenBrandId, setChosenBrandId } from '../../../redux/reducers/brands';
import { BrandFormInputPropsType } from '../types';

const BrandFormInput = React.memo( ( { id, name, chosen }: BrandFormInputPropsType ): ReactElement => {
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
          ? <div onClick={ removeBrandStatusChosen }><span/>{ name }</div>
          : <div onClick={ addBrandStatusChosen }><span/>{ name }</div>
        }
      </div>
    </label>
  );
} );

export default BrandFormInput;
