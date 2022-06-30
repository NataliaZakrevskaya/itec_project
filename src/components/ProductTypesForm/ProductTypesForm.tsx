import React from 'react';
import style from './ProductTypesForm.module.scss';
import { getProductsTypes } from '../../mocks';
import ProductTypeInput from './ProductTypeInput/ProductTypeInput';

const ProductTypesForm = () => {
  const productsTypes = getProductsTypes();

  return (
    <div className={ style.productTypesBlock }>
      <h3>Тип товара</h3>
      <div className={ style.radioGroup }>
        {
          productsTypes.map( type =>
            <ProductTypeInput key={ type.id } name={ type.name } isActiveValue={ type.is_active }/>,
          )
        }
      </div>
    </div>
  );
};

export default ProductTypesForm;
