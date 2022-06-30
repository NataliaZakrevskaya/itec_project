import React from 'react';
import style from './ProductsBlockPagination.module.scss';
import prevPage from '../../Images/prevPage.svg';
import nextPage from '../../Images/nextPage.svg';

const ProductsBlockPagination = () => {
  return (
    <div className={style.paginationBlock}>
      <div className={style.navigationBlock}>
        <img className={style.navigationBlockLeft} src={ prevPage } alt="prevPage"/>
        <p>Предыдущая</p>
      </div>
      <div>
        1 2 3 {/*//todo заглушка, после будет пагинаци*/}
      </div>
      <div className={style.navigationBlock}>
        <p>Следующая</p>
        <img className={style.navigationBlockRight} src={ nextPage } alt="nextPage"/>
      </div>
    </div>
  );
};

export default ProductsBlockPagination;