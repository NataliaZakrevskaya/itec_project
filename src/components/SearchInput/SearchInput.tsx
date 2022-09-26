import React, { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import style from './SearchInput.module.scss';
import SearchResultsBlock from '../Header/SearchResultsBlock/SearchResultsBlock';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromSearch } from '../../redux/selectors/productsFromSearch';
import { fetchProductsFromSearchTC } from '../../redux/reducers/productsFromSearch';
import { AppDispatch } from '../../redux/store';
import { SearchInputPropsType } from './types';
import { useDebounce } from '../../customHooks/useDebounce';

const SearchInput = React.memo( ( { forHeaderBurger, closeBurgerNuv }: SearchInputPropsType ): ReactElement => {

  const [ search, setSearch ] = useState( '' );
  const debouncedSearch = useDebounce( search, 1000 );

  const resultProductItems = useSelector( getProductsFromSearch )
    .filter( ( item, index ) => index < 6 );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const searchInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setSearch( e.target.value );
  };
  const onRejResultButtonClick = useCallback( () => {
    navigate( routesPathsEnum.CATALOG );
    setSearch( '' );
  }, [ navigate ] );
  const onProductItemClick = useCallback( ( id: number ) => {
    if ( !!closeBurgerNuv ) closeBurgerNuv();
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
    setSearch( '' );
  }, [ navigate ] );

  useEffect( () => {
    if ( !window.localStorage.getItem( 'productsFromSearch' ) ) {
      dispatch( fetchProductsFromSearchTC( { search: debouncedSearch } ) );
    }
  }, [ debouncedSearch, dispatch ] );

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
} );

export default SearchInput;