import React from 'react';
import style from './BasketPage.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import { getProductItems } from '../../mocks';

const BasketPage = () => {

  const productsInBasket = getProductItems() //todo позже будет запрос на продукты в корзине

  return (
    <div className={style.basketPageBlock}>
      <div className={ style.navigationBlock }>
        <p>Главная
          <img src={ nextIcon } alt="nextIcon"/>
          Каталог
        </p>
      </div>
      <h1>Моя корзина</h1>
      <div className={style.basketInfo}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default BasketPage;