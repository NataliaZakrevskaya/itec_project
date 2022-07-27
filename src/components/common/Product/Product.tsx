import React from 'react';
import style from './Product.module.scss';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import { OptionType } from '../../../mocks';
import basket from '../../../Images/basket.svg';
import { useDispatch } from 'react-redux';
import {
  decrementProductQuantity,
  incrementProductQuantity, removeByChosenOptionId,
  removeWithoutChosenOptionId,
} from '../../../redux/reducers/basket-reducer';
import { stringCutter } from '../../../helpers/stringCutter';
import { AppDispatch } from '../../../redux/store';

const Product = ( { id, options, name, image, isForModal, chosenOption, from }: ProductForBasketPropsType ) => {
  const countOfProduct = chosenOption ? chosenOption.quantity : options[ 0 ].quantity;
  const dispatch = useDispatch<AppDispatch>();
  const productName = stringCutter( name, 70 );

  const onDecrementBtnClick = () => {
    if ( countOfProduct > 1 ) {
      const optionId = chosenOption ? chosenOption.id : options[ 0 ].id;
      dispatch( decrementProductQuantity( { optionId } ) );
    }
  };
  const onIncrementBtnClick = () => {
    const optionId = chosenOption ? chosenOption.id : options[ 0 ].id;
    dispatch( incrementProductQuantity( { optionId } ) );
  };
  const deleteProductFromBasket = () => {
    if(chosenOption){
      const optionId = chosenOption.id
      dispatch(removeByChosenOptionId({optionId}))
    } else {
    const optionId = options[0].id
    dispatch( removeWithoutChosenOptionId( { optionId } ) );
    } };
  return (
    <div className={ style.productForBasketContainer }>
      <div className={ style.imageWrapper }>
        <img src={ image } alt="product"/>
      </div>
      <div
        className={ isForModal ? `${ style.productMainInfo } ${ style.widthForModalMainProductInfo }` : `${ style.productMainInfo } ${ style.widthForBasketMainProductInfo }` }>
        <h3 className={ style.basketTitle }>
          { productName }
        </h3>
        <div className={ style.heftWrapper }>
          {
            options.map( option =>
              <ProductItemUnit
                key={ option.id }
                option={ option }
                productId={ id }
                active={ chosenOption ? chosenOption.id === option.id : options[ 0 ].id === option.id }
                from={ from }
              />,
            )
          }
        </div>
        <p onClick={ () => alert( 'Переход на модалку' ) }>Указать свой вес</p>
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
  chosenOption: null | OptionType,
  from: string
}