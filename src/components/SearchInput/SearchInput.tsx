import React, { ChangeEvent, useLayoutEffect, useState } from 'react';
import style from './SearchInput.module.scss';
import SearchResultsBlock from '../Header/SearchResultsBlock/SearchResultsBlock';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromSearch } from '../../redux/selectors/productsFromSearch-selectors';
import { fetchProductsFromSearchTC } from '../../redux/reducers/productsFromSearch-reducer';

const SearchInput = ( { forHeaderBurger }: SearchInputPropsType ) => {

  const [ search, setSearch ] = useState( '' );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resultProductItems = useSelector( getProductsFromSearch )
    .filter( ( item, index ) => index < 6 );

  const searchInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setSearch( e.target.value );
  };
  const onRejResultButtonClick = () => {
    navigate( routesPathsEnum.CATALOG );
    setSearch( '' );
  };
  const onProductItemClick = ( id: number ) => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
    setSearch( '' );
  };

  useLayoutEffect( () => {
    // @ts-ignore
    dispatch( fetchProductsFromSearchTC( { search } ) );
  }, [ search ] );

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
};

export default SearchInput;

type SearchInputPropsType = {
  forHeaderBurger: boolean
}