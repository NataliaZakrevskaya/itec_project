import React, { useEffect } from 'react';
import style from './ProductTypesForm.module.scss';
import ProductTypeInput from './ProductTypeInput/ProductTypeInput';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenProductTypeId, getProductTypes } from '../../redux/selectors/productTypes-selectors';
import { fetchProductTypesTC, setActiveProductTypeId } from '../../redux/reducers/productTypes-reducer';

const ProductTypesForm = () => {
  const dispatch = useDispatch()
  const productsTypes = useSelector(getProductTypes);
  const chosenProductTypeId = useSelector(getChosenProductTypeId)
  const chooseActiveProductType = ( id: number) => {
    dispatch(setActiveProductTypeId({id}))
  };
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProductTypesTC())
  }, [])

  return (
    <div className={ style.productTypesBlock }>
      <h3>Тип товара</h3>
      <div className={ style.radioGroup }>
        {
          productsTypes.map( type =>
            <ProductTypeInput
              key={ type.id }
              id={type.id}
              name={ type.name }
              isActive={ chosenProductTypeId === type.id }
              chooseActiveProductType={ chooseActiveProductType }
            />,
          )
        }
      </div>
    </div>
  );
};

export default ProductTypesForm;
