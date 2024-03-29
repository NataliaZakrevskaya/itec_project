import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsInBasket,
  getTotalProductsCount,
  getTotalSum,
  getTotalSumWithDiscount,
} from '../../redux/selectors/basket';
import { location } from '../../enums';
import { getPreviouslyProduct } from '../../redux/selectors/previouslyProducts';
import { getInfo } from '../../redux/selectors/descriptionShop';
import { getGoods } from '../../helpers/getGoods';
import { getPriceForBasket } from '../../helpers/getPrice';
import { AppDispatch } from '../../redux/store';
import { fetchDiscountForBasketTC } from '../../redux/reducers/discountForBasket';
import { fetchArticlesTC } from '../../redux/reducers/articles';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { getArticles } from '../../redux/selectors/articles';

const BasketPage = React.memo( () => {
  const productsInBasket = useSelector( getProductsInBasket );
  const basketCount = useSelector( getTotalSum );
  const basketCountWithDiscount = useSelector( getTotalSumWithDiscount );
  const productsCount = useSelector( getTotalProductsCount );
  const previouslyProducts = useSelector( getPreviouslyProduct );
  const { address } = useSelector( getInfo );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const articlesFromStore = useSelector( getArticles );
  const showDiscount = basketCount !== basketCountWithDiscount;
  const isFullBasket = productsInBasket.length;
  const price = getPriceForBasket( basketCount );
  const priceWithDiscount = getPriceForBasket( basketCountWithDiscount );
  const goodsName = getGoods( productsCount );
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  useEffect( () => {
    dispatch( fetchDiscountForBasketTC() );
  }, [ dispatch ] );
  useEffect( () => {
    const chosenAnimalId = chosenAnimalTypeId ? chosenAnimalTypeId : null;
    dispatch( fetchArticlesTC( { chosenAnimalId } ) );
  }, [ dispatch, chosenAnimalTypeId ] );

  return (
    <div className={ style.basketPageBlock }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon" draggable="false"/>
          <p>Корзина </p>
        </div>
      </div>
      {
        isFullBasket
          ? (
            <div className={ style.basketWrapper }>
              <h1 className={ style.basketTitle }>Моя корзина</h1>
              <div className={ style.basketInfoBlockContainer }>
                <div className={ style.productsItemsBlockContainer }>
                  {
                    productsInBasket.map( item =>
                      <Product
                        key={ item.id }
                        product={ item }
                        isForModal={ false }
                        from={ location.BASKET }
                      />,
                    )
                  }
                </div>
                <div className={ style.basketInfoContainer }>
                  <div className={ style.basketInfo }>
                    <div className={ style.priceBlock }>
                      <p
                        className={ !showDiscount ? style.basketBUN : style.basketBUNWIthDiscount }>{ price } BYN</p>
                      { showDiscount && <p className={ style.basketBUN }>{ priceWithDiscount } BYN</p> }
                    </div>
                    <p className={ style.basketProducts }>{ productsCount } { goodsName }</p>
                  </div>
                  <div className={ style.pickUpBlock }>
                    <img className={ style.basketBoxImage } src={ boxIcon } loading={ 'lazy' } alt="boxIcon" draggable="false"/>
                    <div className={ style.basketTextWrapper }>
                      <h3>Самовывоз</h3>
                      <div className={ style.addressInfo }>
                        <img src={ whiteNavigateIcon } loading={ 'lazy' } alt={ 'whiteNavigateIcon' } draggable="false"/>
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
              <img src={ cat } loading={ 'lazy' } alt="cat" draggable="false"/>
              <h2>В корзине нет товаров. Выберите нужные товары в нашем каталоге</h2>
              <Button title={ 'Перейти в каталог товаров' } onClick={ () => navigate( routesPathsEnum.CATALOG ) }/>
            </div>
          )
      }

      <PopularProductsBlock fromCatalog={ false }/>
      { !!previouslyProducts.length && <PreviouslyProductsBlock products={ previouslyProducts }/> }
      { !!articlesFromStore.length && <UsefulArticlesBlock/> }
    </div>
  );
} );

export default BasketPage;