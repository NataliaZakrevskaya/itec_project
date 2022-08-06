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
                      }: ProductItemPropsType ) => {

  const price = getPrice(+chosenOption.price);
  const navigate = useNavigate();
  const nameForCard = stringCutter( name, 70 );
  const onProductClick = () => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
  };
  return (
    <div className={ `${ style.productItem } ${ classNameForDarkItem }` }>
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
          <p className={ style.price }>{ `${ price } BYN` }</p>
          <div className={ style.basket } onClick={ () => openBasketModal( product ) }>
            <p>+</p>
            <div className={ style.imageWrapper }>
              <img src={ basketIcon } alt="basketIcon"/>
            </div>
          </div>
        </div>
        <button onClick={ () => openOneClickModal(product) }>Купить в 1 клик</button>
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
  from: string
}