import React from 'react';
import { ProductSubtypeInputPropsType } from './types';
import style from './ProductSubtypeInput.module.scss';
import { useDispatch } from 'react-redux';
import { removeChosenSubtypeId, setChosenSubtypeId } from '../../../../redux/reducers/productTypes';

const ProductSubtypeInput = ( { id, name, chosen, discount }: ProductSubtypeInputPropsType ) => {
  const dispatch = useDispatch();

  const addSubtypeStatusChosen = () => {
    dispatch( setChosenSubtypeId( { id } ) );
  };
  const removeSubtypeStatusChosen = () => {
    dispatch( removeChosenSubtypeId( { id } ) );
  };
  return (
    <label key={ id } className={ style.subtypeContainer }>
      <div>
        <input type="checkbox" checked={ chosen } onChange={ () => false }/>
        { chosen
          ? <div onClick={ removeSubtypeStatusChosen }><span/><p>{ name }</p></div>
          : <div onClick={ addSubtypeStatusChosen }><span/><p>{ name }</p></div>
        }
      </div>
      { discount && <p className={ style.discount }>Акция</p> }
    </label>
  );
};

export default ProductSubtypeInput;