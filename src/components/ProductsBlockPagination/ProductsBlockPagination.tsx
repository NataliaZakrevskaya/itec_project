import React, { ReactElement, useState } from 'react';
import style from './ProductsBlockPagination.module.scss';
import prevPage from '../../Images/prevPage.svg';
import nextPage from '../../Images/nextPage.svg';
import { ProductsBlockPaginationType } from './types';

const ProductsBlockPagination = React.memo(( {
                                    totalProductsCount,
                                    pageSize,
                                    actualPage,
                                    onPageChanged,
                                    portionSize = 3,
                                    withWords,
                                  }: ProductsBlockPaginationType ): ReactElement => {

  const [ portionNumber, setPortionNumber ] = useState( 1 );
  let pagesCount = Math.ceil( totalProductsCount / pageSize );
  const portionCount = Math.ceil( pagesCount / portionSize );
  const leftPortionPageNumber = actualPage === pagesCount ? actualPage - 2 : actualPage - 1;
  const rightPortionPageNumber = actualPage === 1 ? actualPage + 2 : actualPage + 1;
  let pages = [] as Array<number>;
  for ( let i = 1; i <= pagesCount; i++ ) {
    pages.push( i );
  }

  const onPrevButtonClick = () => {
    if ( portionCount > 1 ) {
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
      <div className={ style.navigationBlock } onClick={ onPrevButtonClick }>
        <img className={ style.navigationBlockLeft } loading={'lazy'} src={ prevPage } alt="prevPage"/>
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
      <div className={ style.navigationBlock } onClick={ onNextButtonClick }>
        { withWords && <p>Следующая</p> }
        <img className={ style.navigationBlockRight } loading={'lazy'} src={ nextPage } alt="nextPage"/>
      </div>
    </div>
  );
});

export default ProductsBlockPagination;