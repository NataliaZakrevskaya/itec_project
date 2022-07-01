import React, { ChangeEvent, useState } from 'react';
import { getBrands } from '../../mocks';
import BrandFormInput from './BrandFormInput/BrandFormInput';
import style from './BrandsForm.module.scss';
import RejectSearchResult from '../common/modals/RejectSearchResult/RejectSearchResult';

const BrandsForm = () => {

  const brands = getBrands();

  const [brandName, setBrandName] = useState('')
  const successResult = true //todo после получется из состояния запроса

  const onBrandInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.currentTarget.value)
  }

  return (
    <div className={ style.brandsFormBlock }>
      <h3>Бренд</h3>
      <input onChange={onBrandInputChange} placeholder={'Название бренда'} value={brandName}/>
      {
        successResult
        ? (
            <div className={ style.brandsFormGroup }>
              {
                brands.map( brand =>
                  <BrandFormInput key={ brand.id } name={ brand.name }/>,
                )
              }
            </div>
          )
          : (
            <div className={ style.rejectSearchResultContainer  }>
            <RejectSearchResult requestTitle={'бренды'} />
            </div>
          )
      }

    </div>
  );
};

export default BrandsForm;
