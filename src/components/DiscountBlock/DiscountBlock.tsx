import React, { ReactElement, useEffect } from 'react';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './DiscountBlock.module.scss';
import { getBanners } from '../../redux/selectors/descriptionShop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDescriptionShopTC } from '../../redux/reducers/descriptionShop';
import { AppDispatch } from '../../redux/store';
import Discount from './Discount/Discount';

const DiscountBlock = React.memo( (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const banners = useSelector( getBanners );
  useEffect( () => {
    dispatch( fetchDescriptionShopTC() );
  }, [ dispatch ] );
  return (
    <div className={ `${ commonStyle.container } ${ style.discountBlock }` } id={ 'discounts' }>
      { banners.length > 0 &&
        <Discount title={ banners[ 0 ].title } img={ banners[ 0 ].image } background={ banners[ 0 ].color }/> }
      { banners.length > 1 &&
        <Discount title={ banners[ 1 ].title } img={ banners[ 1 ].image } background={ banners[ 1 ].color }/> }
    </div>

  );
} );

export default DiscountBlock;