import { ProductForOneClickPropType } from '../types';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import {
  getPriceWithDiscount,
  getPriceWithoutDiscount,
  getProductCount,
  getProductForOneClickOrder,
} from '../../../redux/selectors/oneClickOrder';
import { getDiscountsForBasket } from '../../../redux/selectors/discountForBasket';
import { stringCutter } from '../../../helpers/stringCutter';
import { location } from '../../../enums';
import {
  decrementOneOrderProductQuantity,
  incrementOneOrderProductQuantity,
} from '../../../redux/reducers/onClickOrder';
import { routesPathsEnum } from '../../../routes/enums';
import { setWeightSetIsShowed } from '../../../redux/reducers/app';
import style from '../Product/Product.module.scss';
import { PRODUCT_IMAGE } from '../../../constants';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import { getPriceForBasket } from '../../../helpers/getPrice';

const ProductForOneClick = ( {
                               isForModal,
                               closeOneClickModal,
                               from,
                             }: ProductForOneClickPropType ): ReactElement => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id, name, chosen_option, greatest_discount, images, options } = useSelector( getProductForOneClickOrder );
  const countOfProduct = useSelector( getProductCount );
  const basketDiscount = useSelector( getDiscountsForBasket )[ 0 ];
  const productName = stringCutter( name, 70 );
  const priceWithoutDiscount = useSelector( getPriceWithoutDiscount );
  const priceWithDiscountFromStore = useSelector( getPriceWithDiscount );
  const price = getPriceForBasket( priceWithoutDiscount );
  const priceWithDiscount = getPriceForBasket( priceWithDiscountFromStore );
  const showDiscount = ( !isForModal && !!greatest_discount ) || ( !isForModal && !!chosen_option.discount_by_option );

  const onDecrementBtnClick = () => {
    if ( countOfProduct > 1 ) {
      dispatch( decrementOneOrderProductQuantity( {
        quantity: 1,
        basketDiscount,
      } ) );
    }
  };
  const onIncrementBtnClick = () => {
    dispatch( incrementOneOrderProductQuantity( {
      quantity: 1,
      basketDiscount,
    } ) );
  };
  const onNameClick = () => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
    closeOneClickModal();
  };
  const onSetWeightClick = () => {
    closeOneClickModal();
    dispatch( setWeightSetIsShowed( { status: true } ) );
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
    if ( from === 'oneClickOrder' ) document.documentElement.scrollTo( 0, 0 );
  };

  return (
    <div className={ style.productForBasketContainer }>
      <div className={ style.productWrap }>
        <div className={ style.imageWrapper }>
          <img src={ images[ 0 ] ? images[ 0 ].image : `${ PRODUCT_IMAGE }` } loading={ 'lazy' } alt="product" draggable="false"/>
        </div>
        <div
          className={ isForModal ? `${ style.productMainInfo } ${ style.widthForModalMainProductInfo }` : `${ style.productMainInfo } ${ style.widthForBasketMainProductInfo }` }>
          <h3 className={ style.basketTitle } onClick={ onNameClick }>
            { productName }
          </h3>
          <div className={ style.heftWrapper }>
            {
              options
                .filter( option => !option.partial )
                .map( option =>
                  <ProductItemUnit
                    key={ option.id }
                    option={ option }
                    productId={ id }
                    active={ chosen_option.id === option.id }
                    from={ from }
                  />,
                )
            }
          </div>
          { options.some( option => option.partial ) &&
            <p onClick={ onSetWeightClick }>Указать свой вес</p>
          }
        </div>
      </div>
      <div
        className={ from === location.ONE_CLICK_ORDER ? style.quantityManagementBlockWrapperForModal : style.quantityManagementBlockWrapper }>
        <div className={ style.quantityManagementBlockPositionContainer }>
          <div className={ style.quantityManagementBlockContainer }>
            { chosen_option.partial
              ? <div className={ style.quantity }>{ chosen_option.quantity / 1000 } кг.</div>
              : ( <div className={ style.quantityManagementBlock }>
                <div className={ style.minus } onClick={ onDecrementBtnClick }>
                  <div/>
                </div>
                <div className={ style.countMeaning }>
                  { countOfProduct }
                </div>
                <div className={ style.plus } onClick={ onIncrementBtnClick }>
                  <div/>
                </div>
              </div> ) }
          </div>
          { showDiscount && <div className={ style.discount }>Акция</div> }
        </div>
        { isForModal &&
          <div className={ style.priceBlock }>
            <p
              className={ priceWithDiscount === price ? style.price : style.priceWithDiscount } translate={ 'no' }>{ price } BYN.</p>
            { priceWithDiscount !== price && <p
              className={ style.price } translate={ 'no' }>{ priceWithDiscount } BYN.</p> }
          </div>
        }
      </div>
    </div>
  );
};

export default ProductForOneClick;