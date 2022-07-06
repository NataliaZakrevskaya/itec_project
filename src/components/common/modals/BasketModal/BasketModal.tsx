import React from 'react';
import selectIcon from '../../../../Images/checkmarkCircle.svg';
import Product from '../../Product/Product';
import { OptionType } from '../../../../mocks';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../../routes/enums';
import style from './BasketModal.module.scss';

const BasketModal = ( { name, unit, options, image, isForModal, id }: BasketModalPropsType ) => {
  const navigate = useNavigate();

  return (
    <div className={ style.basketModalContainer }>
      <div className={ style.title }>
        <img src={ selectIcon } alt="selectIcon"/>
        <h3>Товар добавлен в корзину</h3>
      </div>
      <div className={style.product}>
        <Product
          id={ id }
          name={ name }
          unit={ unit }
          options={ options }
          image={ image }
          isForModal={ isForModal }
          key={ id }
        />
      </div>
      <div className={style.buttons}>
        <button onClick={ () => navigate( routesPathsEnum.BASKET ) } className={style.basketBtn}>Перейти в корзину</button>
        <button onClick={ () => navigate( routesPathsEnum.CATALOG ) } className={style.catalogBtn}>Продолжить покупки</button>
      </div>

    </div>
  );
};

export default BasketModal;

type BasketModalPropsType = {
  name: string,
  unit: string,
  options: Array<OptionType>,
  image: string,
  isForModal: boolean,
  id: number
}