import React, { useState } from 'react';
import style from './Product.module.scss';
import ProductItemUnit from '../../ProductItemUnit/ProductItemUnit';
import { OptionType, ProductItemType } from '../../../mocks';
import basket from "../../../Images/basket.svg";

const Product = ( { options, name, image, product, isForOneClick }: ProductForBasketPropsType ) => {
  const [ countOfProduct, setCountOfProduct ] = useState( 1 );
  const onDecrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct - 1 );
  };
  const onIncrementBtnClick = () => {
    setCountOfProduct( () => countOfProduct + 1 );
  };
  return (
    <div className={ style.productForBasketContainer }>
        <div className={style.abc}>
            <div className={style.imageWrapper}>
                <img className={ style.productItemImg } src={ image } alt="product"/>
            </div>
            <div className={style.basketTitleWrapper}>
                <h3 className={style.basketTitle}>
                    { name }
                </h3>
                <div className={style.heftWrapper}>
                    {
                        options.map( option =>
                            <ProductItemUnit
                                key={ option.id }
                                count={ option.count }
                                unit={ product.unit }
                            />,
                        )
                    }
                </div>
                <p onClick={ () => alert( 'Переход на модалку' ) }>Указать свой вес</p>
            </div>
        </div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <div className={ style.quantityManagementBlock }>
          <div className={style.minus} onClick={ onDecrementBtnClick }><div></div></div>
          <div className={style.countMeaning}>{ countOfProduct }</div>
          <div className={style.plus} onClick={ onIncrementBtnClick }><div><span></span></div></div>
            <img className={style.basketImage} src={ basket } alt="basketIcon"/>
        </div>
        {isForOneClick &&
          <div>
            <p>235 BYN.</p> {/*//todo позже будет получаться из стора*/}
          </div>
        }
      </div>
    </div>
  );
};

export default Product;

type ProductForBasketPropsType = {
  product: ProductItemType
  options: Array<OptionType>,
  name: string,
  image: string
  isForOneClick: boolean
}