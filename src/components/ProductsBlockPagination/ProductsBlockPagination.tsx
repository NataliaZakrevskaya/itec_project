import React, { useState } from 'react';
import style from './ProductsBlockPagination.module.scss';
import prevPage from '../../Images/prevPage.svg';
import nextPage from '../../Images/nextPage.svg';

const ProductsBlockPagination = ( {
                                    totalProductsCount,
                                    pageSize,
                                    actualPage,
                                    onPageChanged,
                                    portionSize = 3,
                                  }: ProductsBlockPaginationType ) => {

  let pagesCount = Math.ceil( totalProductsCount / pageSize );

  let pages = [] as Array<number>;
  for ( let i = 1; i <= pagesCount; i++ ) {
    pages.push( i );
  }

  const portionCount = Math.ceil( pagesCount / portionSize );
  const [ portionNumber, setPortionNumber ] = useState( 1 );
  const leftPortionPageNumber = ( portionNumber - 1 ) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const onPrevButtonClick = () => {
    if(portionCount > 1){
      setPortionNumber( portionNumber - 1 )
    }
  }
  const onNextButtonClick = () => {
    if(portionCount > portionNumber){
      setPortionNumber( portionNumber + 1 )
    }
  }

  return (
    <div className={ style.paginationBlock }>
      <div className={ style.navigationBlock } onClick={ onPrevButtonClick }>
        <img className={ style.navigationBlockLeft } src={ prevPage } alt="prevPage"/>
        <p>Предыдущая</p>
      </div>
      <div className={ style.pages }>
        { pages
          .filter( page => page >= leftPortionPageNumber && page <= rightPortionPageNumber )
          .map( ( page ) => {
            return (
              <p
                key={ page }
                onClick={ () => {onPageChanged( page )} }
                className={actualPage === page ? `${style.page} ${style.active}` : style.page}
              >{ page }
              </p>
            );
          } ) }
      </div>
      <div className={ style.navigationBlock } onClick={ onNextButtonClick }>
        <p>Следующая</p>
        <img className={ style.navigationBlockRight } src={ nextPage } alt="nextPage"/>
      </div>
    </div>
  );
};

export default ProductsBlockPagination;

type ProductsBlockPaginationType = {
  totalProductsCount: number,
  pageSize: number
  actualPage: number,
  portionSize: number,
  onPageChanged: ( pageNumber: number ) => void
}