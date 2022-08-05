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
import { getProductsInBasket, getTotalProductsCount, getTotalSum } from '../../redux/selectors/basket-selectors';
import { location } from '../../enums';
import { getPreviouslyProduct } from '../../redux/selectors/previouslyProducts-selector';
import { getInfo } from '../../redux/selectors/descriptionShop-selectors';
import { getGoods } from '../../helpers/getGoods';
import { getPrice } from '../../helpers/getPrice';

const BasketPage = () => {

  const productsInBasket = useSelector( getProductsInBasket );
  const basketCount = useSelector( getTotalSum );
  const productsCount = useSelector( getTotalProductsCount );
  const previouslyProducts = useSelector( getPreviouslyProduct );
  const { address } = useSelector( getInfo );
  const isEmptyBasket = productsInBasket.length;
  const navigate = useNavigate();
  const price = getPrice( basketCount );
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
        isEmptyBasket
          ? (
            <div className={ style.basketWrapper }>
              <h1>Моя корзина</h1>
              <div className={ style.basketInfoBlockContainer }>
                <div className={ style.productsItemsBlockContainer }>
                  {
                    productsInBasket.map( item =>
                      <Product
                        key={ item.id }
                        id={ item.id }
                        options={ item.options }
                        name={ item.name }
                        image={ item.images[ 0 ] ? item.images[ 0 ].image : 'https://compfixer.info/wp-content/uploads/2014/06/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D0%B8%D0%B3%D0%BD-%D0%BA%D0%B0%D0%B1-Samsung.png' }
                        chosenOption={ item.chosen_option }
                        isForModal={ false }
                        from={ location.BASKET }
                      />,
                    )
                  }
                </div>
                <div className={ style.basketInfoContainer }>
                  <div className={ style.basketInfo }>
                    <p className={ style.basketBUN }>{ price } BYN</p>
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