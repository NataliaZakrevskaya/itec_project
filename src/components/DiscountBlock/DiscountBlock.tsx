import React from 'react';
import { getDiscounts } from '../../mocks';
import Discount from './Discount/Discount';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './DiscountBlock.module.scss';

const DiscountBlock = () => {

  const discounts = getDiscounts()

  return (
    <div className={ `${ commonStyle.container } ${style.discountBlock}`} id={'discounts'}>
      {discounts.map(discount =>
      <Discount key={discount.id} title={discount.title} img={discount.img}/>
      )}
    </div>
  );
};

export default DiscountBlock;