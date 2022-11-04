import React from 'react';
import { useSelector } from 'react-redux';
import { getBadProductsList } from '../../../../redux/selectors/app';
import style from './RejectOrderModal.module.scss';
import Error from '../../../../Images/svg/Error';
import Button from '../../Button/Button';
import { CloseRejectedModalPropsType } from './types';

const RejectOrderModal = ( { onBtnClick, forCheckoutPage }: CloseRejectedModalPropsType ) => {
  const badProductsList = useSelector( getBadProductsList );
  return (
    <div className={ style.rejectOrderModalContainer }>
      <Error/>
      <h3>К сожалению, не весь товар есть в наличии.</h3>
      { badProductsList.map( product => <div className={ style.product }
                                             key={ product.id }><p className={ style.name }>{ product.name }</p>
        <p>осталось</p> <p>{ `${product.chosen_option.stock_balance} ${product.chosen_option.partial ? 'гр.' : 'шт.'}` }</p></div> ) }
      <p>{ `Измените количество товара ${forCheckoutPage ? 'в корзине' : '' }и повторите заказ.` }</p>
      <Button title={ `Вернуться в ${forCheckoutPage ? 'корзину' : 'заказ'}` } onClick={ onBtnClick }/>
    </div>
  );
};

export default RejectOrderModal;