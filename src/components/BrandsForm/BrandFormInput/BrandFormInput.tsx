import React from 'react';
import { useDispatch } from 'react-redux';
import { setBrandStatus } from '../../../redux/reducers/brands-reducer';

const BrandFormInput = ({id, name, chosen}: BrandFormInputPropsType) => {


  const dispatch = useDispatch();
  const brandFormInputHandler = () => {
    const isChosen = !chosen
    dispatch(setBrandStatus({id, isChosen}))
  }

  return (
    <label>
      <input type="checkbox" checked={chosen} onChange={brandFormInputHandler}/>
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