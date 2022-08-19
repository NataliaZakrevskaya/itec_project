import React, { ReactElement } from 'react';
import commonStyle from '../../styles/common/Container.module.scss';
import style from './DiscountBlock.module.scss';

const DiscountBlock = React.memo( (): ReactElement => {
  /*const dispatch = useDispatch<AppDispatch>();*/
  /*const discounts = useSelector( getDiscounts );
  useEffect( () => {
    dispatch( fetchDiscountForBasketTC() );
  }, [ dispatch ] );*/
  return (
    <div className={ `${ commonStyle.container } ${ style.discountBlock }` } id={ 'discounts' }>
      {/*<Discount title={ discounts[ 0 ].title } img={ firstDiscount } background={ FIRST_BACKGROUND }/>
      { discounts.length > 1 &&
        <Discount title={ discounts[ 1 ].title } img={ secondDiscount } background={ SECOND_BACKGROUND }/> }*/ }
    </div>

  );
} );

export default DiscountBlock;