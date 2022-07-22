import React from 'react';
import style from './SearchResultsBlock.module.scss';
import ProductItemForSearch from '../../ProductItemForSerch/ProductItemForSearch';
import RejectSearchResult from '../../common/modals/RejectSearchResult/RejectSearchResult';
import { ProductItemType } from '../../../redux/reducers/products-reducer';
import { useSelector } from 'react-redux';
import { getSearchProductStatus } from '../../../redux/selectors/app-selectors';
import { RequestStatus } from '../../../redux/reducers/enums';

const SearchResultsBlock = ( { productItems, onButtonClick, onProductItemClick }: SearchResultsBlockType ) => {

  const successResult = useSelector(getSearchProductStatus) === RequestStatus.SUCCEEDED

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
                    image={ item.images[ 0 ] ? item.images[ 0 ].image : 'https://compfixer.info/wp-content/uploads/2014/06/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D0%B8%D0%B3%D0%BD-%D0%BA%D0%B0%D0%B1-Samsung.png'}
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
};

export default SearchResultsBlock;

type SearchResultsBlockType = {
  productItems: Array<ProductItemType>,
  onButtonClick: () => void,
  onProductItemClick: (id: number) => void
}