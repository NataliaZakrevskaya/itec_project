import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import BrandFormInput from './BrandFormInput/BrandFormInput';
import style from './BrandsForm.module.scss';
import RejectSearchResult from '../common/modals/RejectSearchResult/RejectSearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../redux/selectors/brands';
import Button from '../common/Button/Button';
import { fetchBrandsTC, setChosenBrandsId } from '../../redux/reducers/brands';
import { setActualPage } from '../../redux/reducers/products';
import { AppDispatch } from '../../redux/store';
import { BrandsFormPropsType } from './types';

const BrandsForm = React.memo( ( { closeEditMode, forBurger }: BrandsFormPropsType ): ReactElement => {

  const [ value, setValue ] = useState( '' );

  const brands = useSelector( getBrands );
  const filteredBrands = brands.filter( brand => brand.name.toLowerCase().includes( value.toLowerCase() ) );
  const dispatch = useDispatch<AppDispatch>();
  const setFilters = useCallback( () => {
    const pageNumber = 1;
    closeEditMode();
    dispatch( setChosenBrandsId( {} ) );
    dispatch( setActualPage( { pageNumber } ) );
  }, [ dispatch, closeEditMode ] );
  const clearBrandsForm = useCallback( () => setValue( '' ), [] );
  useEffect( () => {
    if ( !brands[ 0 ] ) {
      dispatch( fetchBrandsTC() );
    }
  }, [ dispatch, brands ] );

  return (
    <div className={ forBurger ? `${style.brandsFormBlock} ${style.forBurger}` : style.brandsFormBlock }>
      <h2>Бренд</h2>
      <input
        onChange={ ( e ) => setValue( e.target.value ) }
        placeholder={ 'Название бренда' }
        value={ value }
      />
      {
        !!filteredBrands.length
          ? (
            <div className={ style.brandsFormGroup }>
              {
                filteredBrands.map( brand =>
                  <BrandFormInput
                    key={ brand.id }
                    id={ brand.id }
                    name={ brand.name }
                    chosen={ brand.chosen }
                  />,
                )
              }
              <Button title={ 'Применить фильтры' } onClick={ setFilters } forBurger={true}/>
            </div>
          )
          : (
            <div className={ style.rejectSearchResultContainer }>
              <RejectSearchResult requestTitle={ 'бренды' } onClick={ clearBrandsForm }/>
            </div>
          )
      }

    </div>
  );
} );

export default BrandsForm;