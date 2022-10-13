import React, { ReactElement, useCallback, useEffect } from 'react';
import style from './ProductTypesForm.module.scss';
import ProductTypeInput from './ProductTypeInput/ProductTypeInput';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenProductTypeId, getProductTypes } from '../../redux/selectors/productTypes';
import { fetchProductTypesTC, setChosenProductTypeId } from '../../redux/reducers/productTypes';
import { setActualPage } from '../../redux/reducers/products';
import { AppDispatch } from '../../redux/store';

const ProductTypesForm = React.memo( ( { forBurger }: { forBurger: boolean } ): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const productsTypes = useSelector( getProductTypes );
  const chosenProductTypeId = useSelector( getChosenProductTypeId );
  const chooseProductType = useCallback( ( id: number ) => {
    dispatch( setChosenProductTypeId( { id } ) );
    dispatch( setActualPage( { pageNumber: 1 } ) );
  }, [ dispatch ] );
  useEffect( () => {
    dispatch( fetchProductTypesTC() );
  }, [ dispatch ] );

  return (
    <div className={ forBurger ? `${style.productTypesBlock} ${style.forBurger}` : style.productTypesBlock }>
      <h2>Тип товара</h2>
      <div className={ style.radioGroup }>
        {
          productsTypes.map( ( { id, name, discount_by_category } ) =>
            <ProductTypeInput
              key={ id }
              id={ id }
              name={ name }
              discount={ !!discount_by_category }
              isActive={ chosenProductTypeId === id }
              chooseProductType={ chooseProductType }
            />,
          )
        }
      </div>
    </div>
  );
} );

export default ProductTypesForm;
