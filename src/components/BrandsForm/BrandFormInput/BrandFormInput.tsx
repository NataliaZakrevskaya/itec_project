import React, { useState } from 'react';

const BrandFormInput = ({name}: BrandFormInputPropsType) => {

  const [isChecked, setIsChecked] = useState(false)
  const brandFormInputHandler = () => {
    setIsChecked(!isChecked)
    //todo после изменится на dispatch санки
  }

  return (
    <label>
      <input type="checkbox" onChange={brandFormInputHandler}/>
      <span/>
      { name }
    </label>
  );
};

export default BrandFormInput;

type BrandFormInputPropsType = {
  name: string
}