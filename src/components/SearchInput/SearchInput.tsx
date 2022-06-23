import React, { useState } from 'react';
import style from './searchInput.module.scss';

const SearchInput = () => {

  const [ value, setValue ] = useState( '' );

  return (
    <input
      className={ style.searchInput }
      placeholder={ 'Search' }
      type="text"
      value={ value }
      onChange={ e => setValue( e.target.value ) }
    />
  );
};

export default SearchInput;