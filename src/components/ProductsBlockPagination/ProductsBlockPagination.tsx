import React, { ReactElement, useState } from 'react';
import style from './ProductsBlockPagination.module.scss';
import prevPage from '../../Images/prevPage.svg';
import nextPage from '../../Images/nextPage.svg';
import { ProductsBlockPaginationType } from './types';

const ProductsBlockPagination = React.memo( ( {
                                                totalProductsCount,
                                                pageSize,
                                                actualPage,
                                                onPageChanged,
                                                withWords,
                                              }: ProductsBlockPaginationType ): ReactElement => {

  const [ portionNumber, setPortionNumber ] = useState( 1 );
  let pagesCount = Math.ceil( totalProductsCount / pageSize );
  const leftPortionPageNumber = actualPage === pagesCount ? actualPage - 2 : actualPage - 1;
  const rightPortionPageNumber = actualPage === 1 ? actualPage + 2 : actualPage + 1;
  let pages = [] as Array<number>;
  for ( let i = 1; i <= pagesCount; i++ ) {
    pages.push( i );
  }

  const onPrevButtonClick = () => {
    if ( actualPage > 1 ) {
      onPageChanged( actualPage - 1 );
      setPortionNumber( portionNumber - 1 );
    }
  };
  const onNextButtonClick = () => {
    if ( pagesCount > actualPage ) {
      onPageChanged( actualPage + 1 );
      setPortionNumber( portionNumber + 1 );
    }
  };

  return (
    <div className={ style.paginationBlock }>
      <div className={ actualPage !== 1 ? style.navigationBlock : `${ style.navigationBlock } ${ style.opacity }` }
           onClick={ onPrevButtonClick }>
        <img className={ style.navigationBlockLeft } loading={ 'lazy' } src={ prevPage } alt="prevPage" draggable="false"/>
        { withWords && <p>Предыдущая</p> }
      </div>
      <div className={ style.pages }>
        { pages
          .filter( page => page >= leftPortionPageNumber && page <= rightPortionPageNumber )
          .map( ( page ) => {
            return (
              <p
                key={ page }
                onClick={ () => {
                  onPageChanged( page );
                } }
                className={ actualPage === page ? `${ style.page } ${ style.active }` : style.page }
              >{ page }
              </p>
            );
          } ) }
      </div>
      <div
        className={ pagesCount !== actualPage ? style.navigationBlock : `${ style.navigationBlock } ${ style.opacity }` }
        onClick={ onNextButtonClick }>
        { withWords && <p>Следующая</p> }
        <img className={ style.navigationBlockRight } loading={ 'lazy' } src={ nextPage } alt="nextPage" draggable="false"/>
      </div>
    </div>
  );
} );

export default ProductsBlockPagination;