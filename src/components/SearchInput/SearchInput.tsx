import React, { ChangeEvent, useState } from 'react';
import style from './SearchInput.module.scss';
import { getProductItems } from '../../mocks';
import SearchResultsBlock from '../Header/SearchResultsBlock/SearchResultsBlock';

const SearchInput = () => {

  const [ value, setValue ] = useState( '' );

  const resultProductItems = getProductItems()
    .filter((item, index) => index < 6)

  const searchInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setValue( e.target.value );
  };

  return (
    <div className={style.searchInputBlock}>
      <input
        className={ style.searchInput }
        placeholder={ `Поиск` }
        type="text"
        value={ value }
        onChange={ searchInputChange }
      />
      { value && <SearchResultsBlock productItems={resultProductItems}/> }
    </div>
  );
};

export default SearchInput;