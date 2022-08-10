import React from 'react';
import style from './BasketPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
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
import { useSelector } from 'react-redux';
import {
  getProductsInBasket,
  getTotalProductsCount,
  getTotalSum,
  getTotalSumWithDiscount,
} from '../../redux/selectors/basket-selectors';
import { location } from '../../enums';
import { getPreviouslyProduct } from '../../redux/selectors/previouslyProducts-selector';
import { getInfo } from '../../redux/selectors/descriptionShop-selectors';
import { getGoods } from '../../helpers/getGoods';
import { getPrice } from '../../helpers/getPrice';
import { PRODUCT_IMAGE } from '../../constants';

const BasketPage = () => {

  const productsInBasket = useSelector( getProductsInBasket );
  const basketCount = useSelector( getTotalSum );
  const basketCountWithDiscount = useSelector( getTotalSumWithDiscount );
  const productsCount = useSelector( getTotalProductsCount );
  const previouslyProducts = useSelector( getPreviouslyProduct );
  const { address } = useSelector( getInfo );
  const isFullBasket = productsInBasket.length;
  const navigate = useNavigate();
  const price = getPrice( basketCount );
  const priceWithDiscount = getPrice( basketCountWithDiscount );
  const goodsName = getGoods( productsCount );

  return (
    <div className={ style.basketPageBlock }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>Корзина </p>
        </div>
      </div>
      {
        isFullBasket
          ? (
            <div className={ style.basketWrapper }>
              <h1 className={style.basketTitle}>Моя корзина</h1>
              <div className={ style.basketInfoBlockContainer }>
                <div className={ style.productsItemsBlockContainer }>
                  {
                    productsInBasket.map( item =>
                      <Product
                        key={ item.id }
                        id={ item.id }
                        options={ item.options }
                        name={ item.name }
                        image={ item.images[ 0 ] ? item.images[ 0 ].image : `${ PRODUCT_IMAGE }` }
                        chosenOption={ item.chosen_option }
                        isForModal={ false }
                        from={ location.BASKET }
                      />,
                    )
                  }
                </div>
                <div className={ style.basketInfoContainer }>
                  <div className={ style.basketInfo }>
                    <p className={!basketCountWithDiscount ? style.basketBUN : style.basketBUNWIthDiscount}>{ price } BYN</p>
                    {!!basketCountWithDiscount && <p className={ style.basketBUN }>{ priceWithDiscount } BYN</p>}
                    <p className={ style.basketProducts }>{ productsCount } { goodsName }</p>
                  </div>
                  <div className={ style.pickUpBlock }>
                    <img className={ style.basketBoxImage } src={ boxIcon } alt="boxIcon"/>
                    <div className={ style.basketTextWrapper }>
                      <h3>Самовывоз</h3>
                      <div className={ style.addressInfo }>
                        <img src={ whiteNavigateIcon } alt={ 'whiteNavigateIcon' }/>
                        <p>{ address }</p>
                      </div>
                    </div>
                  </div>
                  <button className={ style.basketButton } onClick={ () => navigate( routesPathsEnum.CHECKOUT ) }>Оформить
                    заказ
                  </button>
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

      <PopularProductsBlock fromCatalog={ false }/>
      { !!previouslyProducts.length && <PreviouslyProductsBlock products={ previouslyProducts }/> }
      <UsefulArticlesBlock/>
    </div>
  );
};

export default BasketPage;