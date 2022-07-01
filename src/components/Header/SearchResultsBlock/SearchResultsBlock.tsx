import React from 'react';
import style from './SearchResultsBlock.module.scss';
import sadDog from '../../../Images/sadDog.svg';
import ProductItemForSearch from '../../ProductItemForSerch/ProductItemForSearch';
import { ProductItemType } from '../../../mocks';
import SmallerButton from '../../common/SmallerButton/SmallerButton';
import RejectSearchResult from '../../common/modals/RejectSearchResult/RejectSearchResult';

const SearchResultsBlock = ( { productItems }: any ) => {

  const successResult = false; //todo после получется из состояния запроса

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
                    name={ item.name }
                    image={ item.images[ 0 ].image }
                  />,
                )
              }
            </div>
          )
          : (
            <div className={ style.rejectSearchResultContainer }>
              <RejectSearchResult requestTitle={ 'товары' }/>
            </div>
          )
      }
    </div>
  );
};

export default SearchResultsBlock;