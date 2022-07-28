import React from 'react';
import style from './Product.module.scss';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import { OptionType } from '../../../mocks';
import basket from '../../../Images/basket.svg';
import { useDispatch } from 'react-redux';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeByChosenOptionId,
} from '../../../redux/reducers/basket-reducer';
import { stringCutter } from '../../../helpers/stringCutter';
import { AppDispatch } from '../../../redux/store';
import { routesPathsEnum } from '../../../routes/enums';
import { useNavigate } from 'react-router-dom';

const Product = ( { id, options, name, image, isForModal, chosenOption, from }: ProductForBasketPropsType ) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const productName = stringCutter( name, 70 );
  const countOfProduct = chosenOption.quantity;

  const onDecrementBtnClick = () => {
    if ( countOfProduct > 1 ) {
      dispatch( decrementProductQuantity( { optionId: chosenOption.id } ) );
    }
  };
  const onIncrementBtnClick = () => {
    dispatch( incrementProductQuantity( { optionId: chosenOption.id, quantity: 1 } ) );
  };
  const deleteProductFromBasket = () => {
    dispatch( removeByChosenOptionId( { optionId: chosenOption.id } ) );
  };
  const onNameClick = () => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
  };

  return (
    <div className={ style.productForBasketContainer }>
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
          <p onClick={ () => alert( 'Переход на модалку' ) }>Указать свой вес</p>
        }
      </div>
      <div className={ style.quantityManagementBlockWrapper }>
        <div className={ style.quantityManagementBlock }>
          <div className={ style.minus } onClick={ onDecrementBtnClick }>
            <div/>
          </div>
          <div className={ style.countMeaning }>
            { countOfProduct }
          </div>
          <div className={ style.plus } onClick={ onIncrementBtnClick }>
            <div/>
          </div>
          { !isForModal && <img
            className={ style.basketImage }
            src={ basket } alt="basketIcon"
            onClick={ deleteProductFromBasket }
          /> }
        </div>
        { isForModal &&
          <div>
            <p>235 BYN.</p> {/*//todo позже будет получаться из стора*/ }
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