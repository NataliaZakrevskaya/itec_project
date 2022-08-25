import React, { ReactElement, useEffect } from 'react';
import dark from '../../styles/common/DarkBlock.module.scss';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { location } from '../../enums';
import { WithThisProductBuyBlockPropsType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccompanyingProductsTC } from '../../redux/reducers/accompanyingProducts';
import { AppDispatch } from '../../redux/store';
import { getAccompanyingProducts } from '../../redux/selectors/accompanyingProducts';

export const WithThisProductBuyBlock = ( { productId }: WithThisProductBuyBlockPropsType ): ReactElement => {

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector( getAccompanyingProducts );
  useEffect( () => {
    dispatch( fetchAccompanyingProductsTC( { productId } ) );
  }, [ productId ] );

  return (
    <ThemeBlockWrapper
      title={ 'Вместе с этим товаром покупают' }
      onButtonClick={ () => false }
      itemsForBlock={ products }
      blockTheme={ dark }
      from={ location.WITH_THIS_PRODUCT_BUY }
      withoutButton={ true }
    />
  );
};
