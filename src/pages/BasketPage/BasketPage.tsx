import React from 'react';
import style from './BasketPage.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import { getProductItems } from '../../mocks';
import ProductItemForBasket from '../../components/ProductItemForBasket/ProductItemForBasket';
import boxIcon from '../../Images/boxIcon.svg';
import navigateIcon from '../../Images/navigateIcon.svg';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import PreviouslyProductsBlock from '../../components/PreviouslyProductsBlock/PreviouslyProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';

const BasketPage = () => {

  const productsInBasket = getProductItems() //todo позже будет запрос на продукты в корзине
  const basketCount = 543 // позже будет приходить из стора корзины
  const productsCount = 3 // позже будет приходить из стора корзины

  return (
    <div className={style.basketPageBlock}>
      <div className={ style.navigationBlock }>
        <p>Главная
          <img src={ nextIcon } alt="nextIcon"/>
          Каталог
        </p>
      </div>
      <h1>Моя корзина</h1>
      <div className={style.basketInfoBlockContainer}>
        <div className={style.productsItemsBlockContainer}>
          {
            productsInBasket.map(item =>
              <ProductItemForBasket img={item.img[0]} title={item.title} units={item.units}/>
            )
          }
        </div>
        <div className={style.basketInfoContainer}>
          <div className={style.basketInfo}>
            <p>{ basketCount } BYN</p>
            <p>{ productsCount } товара</p>
          </div>
          <div className={style.pickUpBlock}>
            <img src={boxIcon} alt="boxIcon"/>
            <div>
              <h3>Самовывоз</h3>
              <div className={style.addressInfo}>
                <img src={navigateIcon} alt={"navigateIcon"}/>
                <p >Минск, ул. Чюрлёниса, 6.</p>
              </div>
            </div>
          </div>
          <button onClick={() => alert('Переход на модалку оформления заказ')}>Оформить заказ</button>
        </div>
      </div>
      <PopularProductsBlock/>
      <PreviouslyProductsBlock/>
      <UsefulArticlesBlock/>
    </div>
  );
};

export default BasketPage;