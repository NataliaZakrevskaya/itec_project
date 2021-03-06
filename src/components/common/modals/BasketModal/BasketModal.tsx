import React from 'react';
import selectIcon from '../../../../Images/checkmarkCircle.svg';
import { OptionType } from '../../../../mocks';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../../routes/enums';
import style from './BasketModal.module.scss';
import ProductForBasketModal from '../../ProductForBasketModal/ProductForBasketModal';

const BasketModal = ( {
                        name,
                        image,
                        id,
                        closeModal,
                        chosenOption,
                        countOfProduct = 1
                      }: BasketModalPropsType ) => {
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
      <div className={ style.title }>
        <img src={ selectIcon } alt="selectIcon"/>
        <h3>Товар добавлен в корзину</h3>
      </div>
      <div className={ style.product }>
        <ProductForBasketModal
          name={ name }
          image={ image }
          chosenOption={ chosenOption }
          countOfProduct={countOfProduct}
          id={ id }
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

type BasketModalPropsType = {
  name: string,
  image: string,
  id: number,
  chosenOption: OptionType,
  countOfProduct?: number,
  closeModal: () => void
}