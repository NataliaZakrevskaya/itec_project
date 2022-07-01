import React, { ChangeEvent, useState } from 'react';
import style from './ProductTypesForm.module.scss';
import { getProductsTypes } from '../../mocks';
import ProductTypeInput from './ProductTypeInput/ProductTypeInput';

const ProductTypesForm = () => {
  const productsTypes = getProductsTypes();
  const [ activeType, setActiveType ] = useState( 'Наполнитель' ); //todo позже получаем из стора
  const changeActiveTypeId = ( e: ChangeEvent<HTMLInputElement> ) => {
    setActiveType( e.currentTarget.value );
  };

  return (
    <div className={ style.productTypesBlock }>
      <h3>Тип товара</h3>
      <div className={ style.radioGroup }>
        {
          productsTypes.map( type =>
            <ProductTypeInput key={ type.id } name={ type.name } isActive={ activeType === type.name }
                              onChange={ changeActiveTypeId }/>,
          )
        }
      </div>
    </div>
  );
};

export default ProductTypesForm;
