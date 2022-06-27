import React, { useState } from 'react';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import style from './ProductPage.module.scss';
import { WithThisProductBuyBlock } from '../../components/WithThisProductBuy/WithThisProductBuyBlock';
import nextIcon from '../../Images/nextIcon.svg';
import { useParams } from 'react-router-dom';
import { getProductItems } from '../../mocks';
import UnitsForBasket from '../../components/common/UnitsForBasket/UnitsForBasket';
import boxIcon from '../../Images/boxIcon.svg';
import Address from '../../components/common/Address/Address';
import Button from '../../components/common/Button/Button';

const ProductPage = () => {

  const [ countOfProduct, setCountOfProduct ] = useState( 1 );

  const totalSum = 234; //todo позже будет получаться из стора
  const totalWeight = 0.542; //todo позже будет получаться из стора
  const productId = Number( useParams().productId ) - 1;
  const product = getProductItems()[ productId ];
  const { brand, title, img, units } = product;

  const onDecrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct - 1 );
  };
  const onIncrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct + 1 );
  };

  return (
    <div className={ style.productPage }>
      <div className={ style.navigationBlock }>
        <p>Главная
          <img src={ nextIcon } alt="nextIcon"/>
          Каталог
          <img src={ nextIcon } alt="nextIcon"/>
          <span>{ product.title }</span>
        </p>
      </div>
      <div className={ style.productInfo }>
        <h2>{ title }</h2>
        <p>Смотреть все товары бренда { brand.name } </p>
        <div className={ style.imgAndOrderBlock }>
          <div className={ style.imageBlock }>
            <div>
              <img src={ img[ 0 ] } alt="product" className={ style.mainImg }/>
            </div>
            <div className={ style.restImagesBlock }>
              {
                img
                  .filter( ( img, index ) =>
                    index > 0 )
                  .map( img =>
                    <img src={ img } alt="product" className={ style.restImage }/>,
                  )
              }
            </div>
          </div>
          <div className={ style.orderBlock }>
            <h3>
              Варианты фасовки. Выберите удобный вес
            </h3>
            <div className={ style.unitsGroup }>
              { units.map( unit =>
                <UnitsForBasket
                  key={ unit.id }
                  count={ unit.count }
                  name={ unit.name }
                  price={ unit.price }
                />,
              ) }
            </div>
            <p>Задать свой вес</p> {/*//todo удет появлять только если ед. изм. кг*/ }

            <div className={ style.orderInfo }>
              <div>
                <img src={ boxIcon } alt="boxIcon"/>
              </div>
              <div>
                <h3>Самовывоз</h3>
                <p>В данный момент товар можно забрать только самовывозом из нашего уютного магазина по адресу:</p>
                <Address/>
              </div>
            </div>
            <div className={ style.orderInfoForPayment }>
              <h2>
                { totalSum }
                BYN
              </h2>
              <p>Общий вес: { totalWeight } { units[ 0 ].name }</p>
            </div>
            <div className={ style.basketInterface }>
              <div className={ style.quantityManagementBlock }>
                <div onClick={ onDecrementBtnClick }>-</div>
                <div>{ countOfProduct }</div>
                <div onClick={ onIncrementBtnClick }>+</div>
              </div>
              <Button title={ 'Добавить в корзину' } onClick={ () => alert( 'Будет добавлять в корзину' ) }/>
              <div>
                <p>Купить в 1 клик</p> {/*//todo будет открываться модалка*/ }
              </div>
            </div>
          </div>
        </div>
        <h2>Описание</h2>
        <div className={ style.descriptionBlock }>
          <div className={ style.mainDescription }>
            <p>{ product.description }</p>
            <h5>Ключевые особенности:</h5>
            <ul>
              {
                product.keyFeatures.map( features =>
                  <li key={ features.id }>{ features.value }</li>,
                )
              }
            </ul>
            <p>{ product.restDescription }</p>
            <h5>Состав:</h5>
            <p>{ product.composition }</p>
            <p>{ product.explanation }</p>
          </div>
          <div>
            <h5>Гарантированный анализ:</h5>
            <ul>
              {
                product.guaranteedAnalysis.map( analysis =>
                  <li key={ analysis.id }>{ analysis.value }</li>,
                )
              }
            </ul>
            <h5>Пищевые добавки:</h5>
            <div>
              {
                product.foodAdditives.map( additives =>
                  <p key={ additives.id }>{ additives.value }</p>,
                )
              }
            </div>
          </div>
        </div>
      </div>
      <PopularProductsBlock/>
      <WithThisProductBuyBlock/>
      <UsefulArticlesBlock/>
    </div>
  );
};

export default ProductPage;