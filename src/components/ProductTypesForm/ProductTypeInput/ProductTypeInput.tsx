import React from 'react';
import { ProductTypeInputPropsType } from './types';
import { SubcategoryType } from '../../../types';
import ProductSubtypeInput from './ProductSubtypeInput/ProductSubtypeInput';
import { getChosenProductSubtypeId } from '../../../redux/selectors/productTypes';
import style from '../ProductTypesForm.module.scss';
import { useSelector } from 'react-redux';

const ProductTypeInput = React.memo( ( {
                                         id,
                                         name,
                                         isActive,
                                         subcategory,
                                         chooseProductType,
                                       }: ProductTypeInputPropsType ) => {
  const chosenProductSubtypeId = useSelector( getChosenProductSubtypeId );

  return (
    <label className={style.categoryContainer}>
      <div>
        <input type="radio" checked={ isActive } value={ name } onChange={ () => chooseProductType( id ) }/>
        <span/>
        { name }
      </div>
      { isActive &&
        <div>
          { subcategory.map( ( category: SubcategoryType ) =>
            <ProductSubtypeInput
              key={ category.id }
              id={ category.id }
              name={ category.name }
              discount={!!category.discount_subcategory}
              chosen={ chosenProductSubtypeId.includes( category.id ) }
            />,
          ) }
        </div>
      }
    </label>
  );
} );

export default ProductTypeInput;