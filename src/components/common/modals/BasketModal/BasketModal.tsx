import React, { ReactElement } from 'react';
import selectIcon from '../../../../Images/checkmarkCircle.svg';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../../routes/enums';
import style from './BasketModal.module.scss';
import ProductForBasketModal from '../../ProductForBasketModal/ProductForBasketModal';
import { BasketModalPropsType } from '../types';
import { getPriceWithDiscountForProductPage } from '../../../../redux/reducers/helpers';
import { PRODUCT_IMAGE } from '../../../../constants';

const BasketModal = ( {
                        product,
                        closeModal,
                      }: BasketModalPropsType ): ReactElement => {
  const { greatest_discount, chosen_option, name, images, id } = product;
  const countOfProduct = chosen_option.partial ? 1 : chosen_option.quantity;
  const showDiscount = !!greatest_discount || !!chosen_option.discount_by_option;
  const priceWithDiscount = showDiscount ? getPriceWithDiscountForProductPage( product ) : null;
  const navigate = useNavigate();
  const continueShopping = () => {
    navigate( routesPathsEnum.CATALOG );
    closeModal();
  };
  const goToBasket = () => {
    navigate( routesPathsEnum.BASKET );
    closeModal();
  };

  return (
    <div className={ style.basketModalContainer }>
      { showDiscount && <div className={ style.discount }>Акция</div> }
      <div className={ style.title }>
        <img src={ selectIcon } loading={ 'lazy' } alt="selectIcon" draggable="false"/>
        <h3>Товар добавлен в корзину</h3>
      </div>
      <div className={ style.product }>
        <ProductForBasketModal
          name={ name }
          image={ images[ 0 ] ? images[ 0 ].image : `${ PRODUCT_IMAGE }` }
          priceWithDiscount={ priceWithDiscount }
          chosenOption={ chosen_option }
          countOfProduct={ countOfProduct }
          id={ id }
          showDiscount={showDiscount}
        />
      </div>
      <div className={ style.buttons }>
        <button onClick={ goToBasket } className={ style.basketBtn }>Перейти в корзину</button>
        <button onClick={ continueShopping } className={ style.catalogBtn }>Продолжить покупки</button>
      </div>

    </div>
  );
};

export default BasketModal;