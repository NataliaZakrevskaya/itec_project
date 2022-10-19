import React, { ReactElement, useCallback, useEffect } from 'react';
import style from './ProductTypesForm.module.scss';
import ProductTypeInput from './ProductTypeInput/ProductTypeInput';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenProductTypeId, getProductTypes } from '../../redux/selectors/productTypes';
import { fetchProductTypesTC, setChosenProductTypeId } from '../../redux/reducers/productTypes';
import { setActualPage } from '../../redux/reducers/products';
import { AppDispatch } from '../../redux/store';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';

const ProductTypesForm = React.memo( ( { forBurger }: { forBurger: boolean } ): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const productsTypes = useSelector( getProductTypes );
  const chosenProductTypeId = useSelector( getChosenProductTypeId );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const chooseProductType = useCallback( ( id: number ) => {
    dispatch( setChosenProductTypeId( { id } ) );
    dispatch( setActualPage( { pageNumber: 1 } ) );
  }, [ dispatch ] );
  useEffect( () => {
    if ( chosenAnimalTypeId ) dispatch( fetchProductTypesTC( { animalId: chosenAnimalTypeId } ) );
  }, [ dispatch, chosenAnimalTypeId ] );

  return (
    <div className={ forBurger ? `${ style.productTypesBlock } ${ style.forBurger }` : style.productTypesBlock }>
      <h2>Тип товара</h2>
      <div className={ style.radioGroup }>
        {
          productsTypes.map( ( { id, name, subcategory } ) =>
            <ProductTypeInput
              key={ id }
              id={ id }
              name={ name }
              subcategory={ subcategory }
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
