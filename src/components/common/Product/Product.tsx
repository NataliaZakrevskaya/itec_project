import React from 'react';
import style from './Product.module.scss';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import basket from '../../../Images/basket.svg';
import { useDispatch } from 'react-redux';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeByChosenOptionArticle,
} from '../../../redux/reducers/basket-reducer';
import { stringCutter } from '../../../helpers/stringCutter';
import { AppDispatch } from '../../../redux/store';
import { routesPathsEnum } from '../../../routes/enums';
import { useNavigate } from 'react-router-dom';
import { location } from '../../../enums';
import {
  decrementOneOrderProductQuantity,
  incrementOneOrderProductQuantity,
} from '../../../redux/reducers/onClickOrder-reducer';
import { getPrice } from '../../../helpers/getPrice';
import { setWeightSetIsShowed } from '../../../redux/reducers/app-reducer';
import { ProductForBasketPropsType } from '../types';
import { PRODUCT_IMAGE } from '../../../constants';
import { getPriceWithDiscount } from '../../../redux/reducers/helpers';

const Product = ( {
                    product,
                    isForModal,
                    from,
                  }: ProductForBasketPropsType ) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id, name, chosen_option, max_discount, images, options } = product;
  const priceWithDiscount = getPriceWithDiscount( product );
  const productName = stringCutter( name, 70 );
  const countOfProduct = chosen_option.quantity;
  const price = getPrice( chosen_option.partial ? (+chosen_option.price * chosen_option.size / 1000) : (+chosen_option.price * countOfProduct) );
  const showDiscount = ( !isForModal && !!max_discount ) || ( !isForModal && !!chosen_option.discount_by_option );

  const onDecrementBtnClick = () => {
    if ( countOfProduct > 1 ) {
      if ( from === location.ONE_CLICK_ORDER ) dispatch( decrementOneOrderProductQuantity( { quantity: 1 } ) );
      else dispatch( decrementProductQuantity( { optionId: chosen_option.id } ) );
    }
  };
  const onIncrementBtnClick = () => {
    if ( from === location.ONE_CLICK_ORDER ) dispatch( incrementOneOrderProductQuantity( { quantity: 1 } ) );
    else dispatch( incrementProductQuantity( { optionId: chosen_option.id, quantity: 1 } ) );
  };
  const deleteProductFromBasket = () => {
    dispatch( removeByChosenOptionArticle( { article_number: chosen_option.article_number } ) );
  };
  const onNameClick = () => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
  };
  const onSetWeightClick = () => {
    dispatch( setWeightSetIsShowed( { status: true } ) );
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
  };

  return (
    <div className={ style.productForBasketContainer }>
      <div className={ style.productWrap }>
        <div className={ style.imageWrapper }>
          <img src={ images[ 0 ] ? images[ 0 ].image : `${ PRODUCT_IMAGE }` } loading={ 'lazy' } alt="product"/>
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
      <div className={ style.quantityManagementBlockWrapper }>
        <div className={ style.quantityManagementBlockPositionContainer }>
          <div className={ style.quantityManagementBlockContainer }>
            { chosen_option.partial
              ? <div className={ style.quantity }>{ chosen_option.quantity } кг.</div>
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
            { !isForModal && <img
              className={ style.basketImage }
              src={ basket } alt="basketIcon"
              loading={ 'lazy' }
              onClick={ deleteProductFromBasket }
            /> }
          </div>
          { showDiscount && <div className={ style.discount }>Акция</div> }
        </div>
        { isForModal &&
          <div className={ style.priceBlock }>
            { price !== priceWithDiscount &&
              <p className={ !priceWithDiscount ? style.price : style.priceWithDiscount }>{ price } BYN.</p> }
            { !!priceWithDiscount && <p className={ style.price }>{ priceWithDiscount % 1 === 0 ? priceWithDiscount : priceWithDiscount.toFixed(2) } BYN.</p> }
          </div>
        }
      </div>
    </div>
  );
};

export default Product;