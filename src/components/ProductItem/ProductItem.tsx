import React from 'react';
import { OptionType } from '../../mocks';
import ProductItemUnit from '../ProductItemUnit/ProductItemUnit';
import basketIcon from '../../Images/basketIcon.svg';
import style from './ProductItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { ProductItemType } from '../../redux/reducers/products-reducer';
import { stringCutter } from '../../helpers/stringCutter';
import { getPrice } from '../../helpers/getPrice';

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
  const navigate = useNavigate();
  const nameForCard = stringCutter( name, 70 );
  const onProductClick = () => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
  };
  const showDiscount = true; //todo после того, как бэк сделает скидки заменить
  const priceWithDiscount = 112 //todo после того, как бэк сделает скидки заменить
  return (
    <div className={ `${ forCatalog ? style.productItemForCatalog : style.productItem} ${ classNameForDarkItem }` }>
      {showDiscount && <div className={style.discount}>Акция</div>}
      <img
        className={ style.mainProductItemImage }
        onClick={ onProductClick }
        src={ image }
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
          <p className={!priceWithDiscount ? style.price : style.priceWithDiscount}>{ `${ price } BYN` }</p>
          {!!priceWithDiscount && <p className={ style.price }>{ `${ priceWithDiscount } BYN` }</p>}
          <div className={ style.basket } onClick={ () => openBasketModal( product ) }>
            <p>+</p>
            <div className={ style.imageWrapper }>
              <img src={ basketIcon } alt="basketIcon"/>
            </div>
          </div>
        </div>
        <button onClick={ () => openOneClickModal( product ) }>Купить в 1 клик</button>
      </div>
    </div>
  );
};

export default ProductItem;

type ProductItemPropsType = {
  product: ProductItemType,
  id: number,
  image: string,
  name: string,
  options: Array<OptionType>,
  classNameForDarkItem?: string,
  chosenOption: OptionType,
  openOneClickModal: ( product: ProductItemType ) => void,
  openBasketModal: ( product: ProductItemType ) => void,
  from: string,
  forCatalog: boolean
}