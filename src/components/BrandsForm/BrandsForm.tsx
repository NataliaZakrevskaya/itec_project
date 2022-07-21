import React, { useEffect, useState } from 'react';
import BrandFormInput from './BrandFormInput/BrandFormInput';
import style from './BrandsForm.module.scss';
import RejectSearchResult from '../common/modals/RejectSearchResult/RejectSearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../redux/selectors/brands-selectors';
import Button from '../common/Button/Button';
import { fetchBrandsTC, setChosenBrandsId } from '../../redux/reducers/brands-reducer';
import { setActualPage } from '../../redux/reducers/products-reducer';

const BrandsForm = ( { closeEditMode }: BrandsFormPropsType ) => {

  const dispatch = useDispatch();
  const brands = useSelector( getBrands );
  const [ value, setValue ] = useState( '' );
  const filteredBrands = brands.filter( brand => brand.name.toLowerCase().includes( value.toLowerCase() ) );

  const setFilters = () => {
    const pageNumber = 1;
    closeEditMode();
    dispatch( setChosenBrandsId( {} ) );
    dispatch( setActualPage( { pageNumber } ) );
  };
  useEffect( () => {
    // @ts-ignore
    dispatch( fetchBrandsTC() );
  }, [] );

  return (
    <div className={ style.brandsFormBlock }>
      <h3>Бренд</h3>
      <input
        onChange={ ( e ) => setValue( e.target.value ) }
        placeholder={ 'Название бренда' }
        value={ value }
      />
      {
        filteredBrands.length
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
              <Button title={ 'Применить фильтры' } onClick={ setFilters }/>
            </div>
          )
          : (
            <div className={ style.rejectSearchResultContainer }>
              <RejectSearchResult requestTitle={ 'бренды' } onClick={ () => setValue( '' ) }/>
            </div>
          )
      }

    </div>
  );
};

export default BrandsForm;

type BrandsFormPropsType = {
  closeEditMode: () => void
}