import React, { ChangeEvent, useState } from 'react';
import style from './SearchInput.module.scss';
import { getProductItems } from '../../mocks';
import SearchResultsBlock from '../Header/SearchResultsBlock/SearchResultsBlock';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';

const SearchInput = ( { forHeaderBurger }: SearchInputPropsType ) => {

  const [ value, setValue ] = useState( '' );
  const navigate = useNavigate();
  const resultProductItems = getProductItems() //todo придет по запросу
    .filter( ( item, index ) => index < 6 );

  const searchInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setValue( e.target.value );
    //todo dispatch Таски по поиску товаров
  };
  const onRejResultButtonClick = () => {
    navigate( routesPathsEnum.CATALOG );
    setValue( '' );
  };
  const onProductItemClick = ( id: number ) => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
    setValue( '' );
  };

  return (
    <div className={ forHeaderBurger ? style.searchInputBlockForHeader : style.searchInputBlock }>
      <input
        className={ style.searchInput }
        placeholder={ `Поиск` }
        type="text"
        value={ value }
        onChange={ searchInputChange }
      />
      { value && <SearchResultsBlock
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