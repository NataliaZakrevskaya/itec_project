import React, { ReactElement } from 'react';
import style from './SearchResultsBlock.module.scss';
import ProductItemForSearch from '../../ProductItemForSerch/ProductItemForSearch';
import RejectSearchResult from '../../common/modals/RejectSearchResult/RejectSearchResult';
import { useSelector } from 'react-redux';
import { getSearchProductStatus } from '../../../redux/selectors/app';
import { RequestStatus } from '../../../redux/reducers/enums';
import { SearchResultsBlockType } from '../types';
import { PRODUCT_IMAGE } from '../../../constants';
import { ProductItemType } from '../../../types';

const SearchResultsBlock = React.memo(( { productItems, onButtonClick, onProductItemClick }: SearchResultsBlockType ): ReactElement => {

  const successResult = useSelector( getSearchProductStatus ) === RequestStatus.SUCCEEDED;

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
                    image={ item.images[ 0 ] ? item.images[ 0 ].image : `${ PRODUCT_IMAGE }` }
                    onClick={ onProductItemClick }
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
});

export default SearchResultsBlock;
