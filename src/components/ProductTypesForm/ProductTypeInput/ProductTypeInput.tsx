import React, { useState } from 'react';

const ProductTypeInput = ({name, isActiveValue}: ProductTypeInputPropsType) => {
  const [isChecked, setIsChecked] = useState(isActiveValue)
  const radioInputHandler = () => {
    setIsChecked(() => !isChecked)
    //todo после изменится на dispatch санки
  }
  return (
      <label>
        <input type="radio" checked={ isChecked } onChange={radioInputHandler}/>
        { name }
      </label>
  );
};

export default ProductTypeInput;

type ProductTypeInputPropsType = {
  name: string,
  isActiveValue: boolean
}