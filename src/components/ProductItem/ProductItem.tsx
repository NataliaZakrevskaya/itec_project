import React from 'react';
import ProductItemUnit from '../ProductItemUnit/ProductItemUnit';
import basketIcon from '../../Images/basketIcon.svg';
import style from './ProductItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { stringCutter } from '../../helpers/stringCutter';
import { getPrice } from '../../helpers/getPrice';
import { ProductItemPropsType } from './types';

const ProductItem = ( {
                        product,
                        image,
                        name,
                        options,
                        id,
                        chosenOption,
                        classNameForDarkItem,
                        openBasketModal,
                        openOneClickModal,
                        from,
                        forCatalog,
                      }: ProductItemPropsType ) => {

  const price = getPrice( +chosenOption.price );
  const nameForCard = stringCutter( name, 70 );
  const showDiscount = true; //todo после того, как бэк сделает скидки заменить
  const priceWithDiscount = 112; //todo после того, как бэк сделает скидки заменить
  const navigate = useNavigate();
  const onProductClick = () => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
  };

  return (
    <div className={ `${ forCatalog ? style.productItemForCatalog : style.productItem } ${ classNameForDarkItem }` }>
      { showDiscount && <div className={ style.discount }>Акция</div> }
      <img
        className={ style.mainProductItemImage }
        onClick={ onProductClick }
        src={ image }
        loading={'lazy'}
        alt={ 'product' }/>
      <p className={ style.title }
         onClick={ onProductClick }>{ nameForCard }</p>
      <div className={ style.unitGroup }>
        { options.map( option =>
          <ProductItemUnit
            key={ option.id }
            option={ option }
            productId={ id }
            from={ from }
            active={ chosenOption.id === option.id }
          />,
        ) }
      </div>
      <div className={ style.priceBlockWrapper }>
        <div className={ style.priceBlock }>
          <p className={ !priceWithDiscount ? style.price : style.priceWithDiscount }>{ `${ price } BYN` }</p>
          { !!priceWithDiscount && <p className={ style.price }>{ `${ priceWithDiscount } BYN` }</p> }
          <div className={ style.basket } onClick={ () => openBasketModal( product ) }>
            <p>+</p>
            <div className={ style.imageWrapper }>
              <img src={ basketIcon } loading={'lazy'} alt="basketIcon"/>
            </div>
          </div>
        </div>
        <button onClick={ () => openOneClickModal( product ) }>Купить в 1 клик</button>
      </div>
    </div>
  );
};

export default ProductItem;