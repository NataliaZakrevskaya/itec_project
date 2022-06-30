import React from 'react';
import style from './SearchResultsBlock.module.scss';
//import sadDog from '../../../Images/sadDog.svg';
import ProductItemForSearch from '../../ProductItemForSerch/ProductItemForSearch';
import { ProductItemType } from '../../../mocks';

const SearchResultsBlock = ( { productItems }: any ) => {
  return (
    <div className={ style.searchResultsBlock }>
      {
        productItems.map( ( item: ProductItemType ) =>
          <ProductItemForSearch
            key={ item.id }
            name={ item.name }
            image={ item.images[ 0 ].image }
          />,
        )
      }
    </div>
    /*<div className={style.badSearchResultBlock}>
      <div  className={style.badSearchResultContainer}>
      <img className={style.withoutResultsImage} src={sadDog} alt="sadDog"/>
      <div className={style.textBlock}>
        <p>По вашему запросу ничего не найдено.</p>
        <p>Попробуйте изменить запрос или выбрать товары в нашем каталоге </p>
      </div>
      <button>Перейти в каталог</button>
      </div>
    </div>*/
  );
};

export default SearchResultsBlock;