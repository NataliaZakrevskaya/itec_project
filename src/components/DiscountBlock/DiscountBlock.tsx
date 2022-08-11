import React from 'react';
import { getDiscounts } from '../../mocks';
import Discount from './Discount/Discount';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './DiscountBlock.module.scss';
import firstDiscount from '../../Images/firstDiscount.jpg';
import secondDiscount from '../../Images/secondDiscount.svg';
import { FIRST_BACKGROUND, SECOND_BACKGROUND } from './constants';

const DiscountBlock = () => {

  const discounts = getDiscounts(); //todo позже приходит с бэка

  return (
    <div className={ `${ commonStyle.container } ${ style.discountBlock }` } id={ 'discounts' }>
          <Discount title={ discounts[0].title } img={ firstDiscount } background={FIRST_BACKGROUND}/>
          <Discount title={ discounts[1].title } img={ secondDiscount } background={SECOND_BACKGROUND}/>
    </div>

  );
};

export default DiscountBlock;