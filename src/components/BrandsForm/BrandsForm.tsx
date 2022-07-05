import React, { ChangeEvent, useEffect } from 'react';
import BrandFormInput from './BrandFormInput/BrandFormInput';
import style from './BrandsForm.module.scss';
import RejectSearchResult from '../common/modals/RejectSearchResult/RejectSearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandName, getBrands } from '../../redux/selectors/brands-selectors';
import { fetchBrandsTC, setBrandName } from '../../redux/reducers/brands-reducer';
import Button from '../common/Button/Button';

const BrandsForm = () => {

  const dispatch = useDispatch();
  const brands = useSelector( getBrands );
  const brandName = useSelector( getBrandName );

  const successResult = true; //todo после получется из состояния запроса

  const onBrandInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    const brandName = e.currentTarget.value;
    dispatch( setBrandName( { brandName } ) );
  };
  const onRejButtonClick = () => {
    const brandName = '';
    dispatch( setBrandName( { brandName } ) );
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchBrandsTC())
  }, [])

  return (
    <div className={ style.brandsFormBlock }>
      <h3>Бренд</h3>
      <input
        onChange={ onBrandInputChange }
        placeholder={ 'Название бренда' }
        value={ brandName }
      />
      {
        successResult
          ? (
            <div className={ style.brandsFormGroup }>
              {
                brands.map( brand =>
                  <BrandFormInput
                    key={ brand.id }
                    id={ brand.id }
                    name={ brand.name }
                    chosen={ brand.chosen }
                  />,
                )
              }
              <Button title={ 'Применить фильтры' } onClick={ () => alert( 'диспатч санки' ) }/>
            </div>
          )
          : (
            <div className={ style.rejectSearchResultContainer }>
              <RejectSearchResult requestTitle={ 'бренды' } onClick={onRejButtonClick}/>
            </div>
          )
      }

    </div>
  );
};

export default BrandsForm;
