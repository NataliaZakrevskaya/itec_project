import React, { ChangeEvent, useState } from 'react';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import style from './ProductPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import { WithThisProductBuyBlock } from '../../components/WithThisProductBuy/WithThisProductBuyBlock';
import nextIcon from '../../Images/nextIcon.svg';
import { useParams } from 'react-router-dom';
import { getProductItems } from '../../mocks';
import UnitsForBasket from '../../components/common/UnitsForBasket/UnitsForBasket';
import boxIcon from '../../Images/boxIcon.svg';
import Address from '../../components/common/Address/Address';
import Button from '../../components/common/Button/Button';

const ProductPage = () => {

  const [ countOfProduct, setCountOfProduct ] = useState<number>( 1 );
  const [ weightSetIsShowed, setWeightSetIsShowed ] = useState<boolean>( false );
  const [ weightSetValue, setWeightSetValue ] = useState<string>( '' );
  const [ selectImageId, setSelectImageId ] = useState<number>( 0 );

  const totalSum = 234; //todo позже будет получаться из стора
  const totalWeight = 0.542; //todo позже будет получаться из стора
  const productId = Number( useParams().productId ) - 1;
  const product = getProductItems()[ productId ]; //todo позже будет просто запрос по апи
  const { brand, name, images, options } = product;

  const onDecrementBtnClick = () => {
    if ( countOfProduct ) {
      setCountOfProduct( () => countOfProduct - 1 );
    }
  };
  const onIncrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct + 1 );
  };
  const onWeightSetInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setWeightSetValue( e.currentTarget.value );
  };
  const onWeightSetParagraphClick = () => {
    setWeightSetIsShowed( !weightSetIsShowed );
  };
  const selectImage = ( id: number ) => {
    setSelectImageId( id );
  };

  return (
    <div className={ style.productPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>Каталог</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>{ product.name }</p>
        </div>
      </div>
      <div className={ style.productInfo }>
        <h2 className={ style.productPageTitle }>{ name }</h2>
        <p className={ style.productPageSubTitle }>Смотреть все товары бренда { brand.name } </p>
        <div className={ style.imgAndOrderBlock }>
          <div className={ style.imageBlock }>
            <div className={ style.mainImageWrapper }>
              <img src={ images[ selectImageId ].image } alt="product" className={ style.mainImg }/>
            </div>
            <div className={ style.restImagesBlock }>
              {
                images
                  .map( img =>
                    <img
                      src={ img.image }
                      alt="product"
                      className={ img.id === selectImageId ? `${ style.restImage } ${ style.selectImg }` : style.restImage }
                      onClick={ () => selectImage( img.id ) }
                    />,
                  )
              }
            </div>
          </div>
          <div className={ style.orderBlock }>
            <h3>
              Варианты фасовки. Выберите удобный вес
            </h3>
            <div>
              <div className={ style.unitsGroup }>
                { options.map( option =>
                  <UnitsForBasket
                    key={ option.id }
                    size={ option.count }
                    price={ +option.price }
                    unit={ product.unit }
                  />,
                ) }
              </div>
              <div>
                <p className={ style.unitsGroupHeft } onClick={ onWeightSetParagraphClick }>Задать свой
                  вес</p>{/*//todo удет появлять только если ед. изм. кг*/ }
                { weightSetIsShowed &&
                  <div className={ style.setWeightBlock }>
                    <h3>Задайте свой вес</h3>
                    <div>
                      <input
                        type="text"
                        value={ weightSetValue }
                        onChange={ onWeightSetInputChange }
                        placeholder={ 'Например: 1,2 кг' }
                      />
                      <button>Применить</button>
                    </div>
                  </div> }
              </div>
            </div>
            <div className={ style.orderInfo }>
              <div className={ style.orderImageWrapper }>
                <img src={ boxIcon } alt="boxIcon"/>
              </div>
              <div>
                <h3>Самовывоз</h3>
                <p className={ style.pickUpInfo }>В данный момент товар можно забрать только самовывозом из нашего
                  уютного магазина по адресу:</p>
                <Address/>
              </div>
            </div>
            <div className={ style.orderInfoForPayment }>
              <h2>
                { totalSum } BYN
              </h2>
              <p>Общий вес: { totalWeight } { product.unit }</p>
            </div>
            <div className={ style.basketInterface }>
              <div className={ style.quantityManagementBlock }>
                <div className={ style.basketInterfaceMinus } onClick={ onDecrementBtnClick }>
                  <div></div>
                </div>
                <div className={ style.basketInterfaceCount }>{ countOfProduct }</div>
                <div className={ style.basketInterfacePlus } onClick={ onIncrementBtnClick }>
                  <div><span></span></div>
                </div>
              </div>
              <div className={ style.basketInterfaceButton }>
                <Button title={ 'Добавить в корзину' } onClick={ () => alert( 'Будет добавлять в корзину' ) }/>
              </div>
              <div>
                <p className={ style.basketInterfaceOneClick }>Купить в 1
                  клик</p> {/*//todo будет открываться модалка*/ }
              </div>
            </div>
          </div>
        </div>
        <h2>Описание</h2>
        <div className={ style.descriptionBlock }> {/*//todo придет уже отредактированное с бэка*/ }
          <div className={ style.mainDescription }>
            <p>{ product.description }</p>
            <p>{ product.features }</p>
            <p>{ product.composition }</p>
          </div>
          <div>
            <p>{ product.analysis }</p>
            <p>{ product.additives } </p>
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