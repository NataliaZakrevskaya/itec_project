import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import style from './SearchInput.module.scss';
import SearchResultsBlock from '../Header/SearchResultsBlock/SearchResultsBlock';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromSearch } from '../../redux/selectors/productsFromSearch-selectors';
import { fetchProductsFromSearchTC } from '../../redux/reducers/productsFromSearch-reducer';
import { AppDispatch } from '../../redux/store';
import { SearchInputPropsType } from './types';
import { useDebounce } from '../../customHooks/useDebounce';

const SearchInput = React.memo(( { forHeaderBurger }: SearchInputPropsType ) => {

  const [ search, setSearch ] = useState( '' );
  const debouncedSearch = useDebounce(search, 1000);

  const resultProductItems = useSelector( getProductsFromSearch )
    .filter( ( item, index ) => index < 6 );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const searchInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setSearch( e.target.value );
  };
  const onRejResultButtonClick = useCallback(() => {
    navigate( routesPathsEnum.CATALOG );
    setSearch( '' );
  }, []);
  const onProductItemClick = useCallback(( id: number ) => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
    setSearch( '' );
  }, []);

  useEffect( () => {
    if ( !window.localStorage.getItem( 'productsFromSearch' ) ) {
      dispatch( fetchProductsFromSearchTC( { search: debouncedSearch } ) );
    }
  }, [ debouncedSearch ] );

  return (
    <div className={ forHeaderBurger ? style.searchInputBlockForHeader : style.searchInputBlock }>
      <input
        className={ style.searchInput }
        placeholder={ `Поиск` }
        type="text"
        value={ search }
        onChange={ searchInputChange }
      />
      { search && <SearchResultsBlock
        productItems={ resultProductItems }
        onButtonClick={ onRejResultButtonClick }
        onProductItemClick={ onProductItemClick }
      /> }
    </div>
  );
});

export default SearchInput;