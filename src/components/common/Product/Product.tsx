import React from 'react';
import style from './Product.module.scss';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import { OptionType } from '../../../mocks';
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

const Product = ( { id, options, name, image, isForModal, chosenOption, from }: ProductForBasketPropsType ) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const productName = stringCutter( name, 70 );
  const countOfProduct = chosenOption.quantity;
  const price = getPrice( +chosenOption.price * countOfProduct );
  const priceWithDiscount = 112; //todo позже от бэка

  const onDecrementBtnClick = () => {
    if ( countOfProduct > 1 ) {
      if ( from === location.ONE_CLICK_ORDER ) dispatch( decrementOneOrderProductQuantity( { quantity: 1 } ) );
      else dispatch( decrementProductQuantity( { optionId: chosenOption.id } ) );
    }
  };
  const onIncrementBtnClick = () => {
    if ( from === location.ONE_CLICK_ORDER ) dispatch( incrementOneOrderProductQuantity( { quantity: 1 } ) );
    else dispatch( incrementProductQuantity( { optionId: chosenOption.id, quantity: 1 } ) );
  };
  const deleteProductFromBasket = () => {
    dispatch( removeByChosenOptionArticle( { article_number: chosenOption.article_number } ) );
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
          <img src={ image } alt="product"/>
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
                    active={ chosenOption.id === option.id }
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
        <div className={style.quantityManagementBlockPositionContainer}>
          <div className={ style.quantityManagementBlockContainer }>
            { chosenOption.partial
              ? <div className={ style.quantity }>{ chosenOption.quantity } кг.</div>
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
              onClick={ deleteProductFromBasket }
            /> }
          </div>
          <div className={style.discount}>Акция</div>
        </div>
        { isForModal &&
          <div className={ style.priceBlock }>
            <p className={ !priceWithDiscount ? style.price : style.priceWithDiscount }>{ price } BYN.</p>
            { !!priceWithDiscount && <p className={ style.price }>{ priceWithDiscount } BYN.</p> }
          </div>
        }
      </div>
    </div>
  );
};

export default Product;

type ProductForBasketPropsType = {
  id: number,
  options: Array<OptionType>,
  name: string,
  image: string,
  isForModal: boolean,
  chosenOption: OptionType,
  from: string
}