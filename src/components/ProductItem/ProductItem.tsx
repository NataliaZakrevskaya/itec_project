import React from 'react';
import { OptionType } from '../../mocks';
import ProductItemUnit from '../ProductItemUnit/ProductItemUnit';
import basketIcon from '../../Images/basketIcon.svg';
import style from './ProductItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { ProductItemType } from '../../redux/reducers/products-reducer';
import { stringCutter } from '../../helpers/stringCutter';

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

  const getPrice = () => {
    if ( chosenOption ) {
      return chosenOption.price;
    }
    return options[ 0 ].price;
  };
  const price = getPrice();
  const navigate = useNavigate();
  const nameForCard = stringCutter( name, 70 );
  const onNameClick = () => {
    navigate( `${ routesPathsEnum.CATALOG }/${ id }` );
  };
  return (
    <div className={ `${ style.productItem } ${ classNameForDarkItem }` }>
      <div className={ style.productItemWrapper }>
        <img className={ style.mainProductItemImage } src={ image } alt={ 'product' }/>
        <p className={ style.title }
           onClick={ onNameClick }>{ nameForCard }</p>
      </div>
      <div className={ style.unitGroup }>
        { options.map( option =>
          <ProductItemUnit
            key={ option.id }
            option={ option }
            productId={ id }
            from={ from }
            active={ chosenOption ? chosenOption.id === option.id : options[ 0 ].id === option.id }
          />,
        ) }
        {/*{ isKilo && <span onClick={ () => navigate( `${ routesPathsEnum.CATALOG }/${ id }` ) }>Задать свой вес</span> }*/}
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
        <button onClick={ openOneClickModal }>Купить в 1 клик</button>
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
  chosenOption: null | OptionType,
  openOneClickModal: () => void,
  openBasketModal: ( product: ProductItemType ) => void,
  from: string
}