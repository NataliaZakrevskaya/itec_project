import React from 'react';
import style from './BasketPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import { getProductItems } from '../../mocks';
import boxIcon from '../../Images/boxIcon.svg';
import whiteNavigateIcon from '../../Images/whiteNavigationIcon.svg';
import cat from '../../Images/cat.svg';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import PreviouslyProductsBlock from '../../components/PreviouslyProductsBlock/PreviouslyProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import Product from '../../components/common/Product/Product';

const BasketPage = () => {

  const productsInBasket = getProductItems().filter( ( item, index ) => index < 3 ); //todo позже будет запрос на продукты в корзине
  const basketCount = 543; // позже будет приходить из стора корзины
  const productsCount = 3; // позже будет приходить из стора корзины
  const isEmptyBasket = false;
  const navigate = useNavigate();

  return (
    <div className={ style.basketPageBlock }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>Корзина </p>
        </div>
      </div>
      {
        !isEmptyBasket
          ? (
            <div className={style.basketWrapper}>
              <h1>Моя корзина</h1>
              <div className={ style.basketInfoBlockContainer }>
                <div className={ style.productsItemsBlockContainer }>
                  {
                    productsInBasket.map( item =>
                      <Product
                        id={item.id}
                        options={item.options}
                        name={ item.name }
                        image={ item.images[0].image }
                        unit={item.unit}
                        isForModal={false}
                      />
                    )
                  }
                </div>
                <div className={ style.basketInfoContainer }>
                  <div className={ style.basketInfo }>
                    <p className={style.basketBUN}>{ basketCount } BYN</p>
                    <p className={style.basketProducts}>{ productsCount } товара</p>
                  </div>
                  <div className={ style.pickUpBlock }>
                    <img className={style.basketBoxImage} src={ boxIcon } alt="boxIcon"/>
                    <div className={style.basketTextWrapper}>
                      <h3>Самовывоз</h3>
                      <div className={ style.addressInfo }>
                        <img src={ whiteNavigateIcon } alt={ 'whiteNavigateIcon' }/>
                        <p>Минск, ул. Чюрлёниса, 6.</p>
                      </div>
                    </div>
                  </div>
                  <button className={style.basketButton} onClick={ () => alert( 'Переход на модалку оформления заказ' ) }>Оформить заказ</button>
                </div>
              </div>
            </div>
          )
          : (
            <div className={ style.emptyBasket }>
              <img src={ cat } alt="cat"/>
              <h2>В корзине нет товаров. Выберите нужные товары в нашем каталоге</h2>
              <Button title={ 'Перейти в каталог товаров' } onClick={ () => navigate( routesPathsEnum.CATALOG ) }/>
            </div>
          )
      }

      <PopularProductsBlock/>
      <PreviouslyProductsBlock/>
      <UsefulArticlesBlock/>
    </div>
  );
};

export default BasketPage;