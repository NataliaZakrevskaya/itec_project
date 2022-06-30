import React from 'react';
import { getBrands } from '../../mocks';
import BrandFormInput from './BrandFormInput/BrandFormInput';
import style from './BrandsForm.module.scss';

const BrandsForm = () => {

  const brands = getBrands();

  return (
    <div className={ style.brandsFormBlock }>
      <h3>Бренд</h3>
      <div className={ style.brandsFormGroup }>
        {
          brands.map( brand =>
            <BrandFormInput key={ brand.id } name={ brand.name }/>,
          )
        }
      </div>
    </div>
  );
};

export default BrandsForm;
