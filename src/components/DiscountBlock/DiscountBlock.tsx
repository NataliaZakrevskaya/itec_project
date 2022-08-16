import React, { useEffect } from 'react';
import Discount from './Discount/Discount';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './DiscountBlock.module.scss';
import firstDiscount from '../../Images/firstDiscount.jpg';
import secondDiscount from '../../Images/secondDiscount.svg';
import { FIRST_BACKGROUND, SECOND_BACKGROUND } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscountsTC } from '../../redux/reducers/discounts-reducer';
import { AppDispatch } from '../../redux/store';
import { getDiscounts } from '../../redux/selectors/discounts-selectors';

const DiscountBlock = React.memo( () => {

  const dispatch = useDispatch<AppDispatch>();
  const discounts = useSelector( getDiscounts );
  useEffect(() => {
    dispatch(fetchDiscountsTC())
  }, [])

  return (
    <div className={ `${ commonStyle.container } ${ style.discountBlock }` } id={ 'discounts' }>
      <Discount title={ discounts[ 0 ].title } img={ firstDiscount } background={ FIRST_BACKGROUND }/>
      {discounts.length > 1 && <Discount title={ discounts[ 1 ].title } img={ secondDiscount } background={ SECOND_BACKGROUND }/>}
    </div>

  );
} );

export default DiscountBlock;