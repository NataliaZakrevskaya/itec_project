import React, { useEffect } from 'react';
import style from './ProductTypesForm.module.scss';
import ProductTypeInput from './ProductTypeInput/ProductTypeInput';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenProductTypeId, getProductTypes } from '../../redux/selectors/productTypes-selectors';
import { fetchProductTypesTC, setChosenProductTypeId } from '../../redux/reducers/productTypes-reducer';
import { setActualPage } from '../../redux/reducers/products-reducer';
import { AppDispatch } from '../../redux/store';

const ProductTypesForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productsTypes = useSelector( getProductTypes );
  const chosenProductTypeId = useSelector( getChosenProductTypeId );
  const chooseProductType = ( id: number ) => {
    const pageNumber  = 1;
    dispatch( setChosenProductTypeId( { id } ) );
    dispatch(setActualPage({pageNumber}))
  };
  useEffect( () => {
    dispatch( fetchProductTypesTC() );
  }, [] );

  return (
    <div className={ style.productTypesBlock }>
      <h3>Тип товара</h3>
      <div className={ style.radioGroup }>
        {
          productsTypes.map( type =>
            <ProductTypeInput
              key={ type.id }
              id={ type.id }
              name={ type.name }
              isActive={ chosenProductTypeId === type.id }
              chooseProductType={ chooseProductType }
            />,
          )
        }
      </div>
    </div>
  );
};

export default ProductTypesForm;
