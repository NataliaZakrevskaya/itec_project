import React from 'react';
import style from './SearchResultsBlock.module.scss';
import ProductItemForSearch from '../../ProductItemForSerch/ProductItemForSearch';
import { ProductItemType } from '../../../mocks';
import RejectSearchResult from '../../common/modals/RejectSearchResult/RejectSearchResult';

const SearchResultsBlock = ( { productItems, onButtonClick, onProductItemClick }: any ) => {

  const successResult = true; //todo после получется из состояния запроса

  return (
    <div>
      {
        successResult
          ? (
            <div className={ style.successSearchResultsBlock }>
              {
                productItems.map( ( item: ProductItemType ) =>
                  <ProductItemForSearch
                    key={ item.id }
                    id={ item.id }
                    name={ item.name }
                    image={ item.images[ 0 ].image }
                    onClick={onProductItemClick}
                  />,
                )
              }
            </div>
          )
          : (
            <div className={ style.rejectSearchResultContainer }>
              <RejectSearchResult requestTitle={ 'товары' } onClick={ onButtonClick }/>
            </div>
          )
      }
    </div>
  );
};

export default SearchResultsBlock;