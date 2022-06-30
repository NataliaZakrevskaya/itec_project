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
              <div className={style.discountBlockWrapper}>
                  <Discount key={discount.id} title={discount.title} img={discount.img}/>
              </div>
          )}
      </div>

  );
};

export default DiscountBlock;