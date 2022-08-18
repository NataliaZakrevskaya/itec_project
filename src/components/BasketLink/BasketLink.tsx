import React from 'react';
import style from './BasketLink.module.scss';
import basketIcon from '../../Images/basketIcon.svg';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useSelector } from 'react-redux';
import { getTotalProductsCount } from '../../redux/selectors/basket';
import { BasketLinkPropsType } from './types';

const BasketLink = React.memo(( { forHeaderBurger, onClickHandler }: BasketLinkPropsType ) => {

  const productCount = useSelector( getTotalProductsCount );
  const navigate = useNavigate();
  const onBasketClick = () => {
    onClickHandler();
    navigate( routesPathsEnum.BASKET );
  };

  return (
    <>
      { forHeaderBurger
        ? ( <div className={ style.basketLinkForBurger } onClick={ onBasketClick }>
          <img src={ basketIcon } loading={'lazy'} alt={ 'basketIcon' }/>
          <p>Корзина</p>
        </div> )
        : ( <div className={ style.basketLink } onClick={ () => navigate( routesPathsEnum.BASKET ) }>
          <img src={ basketIcon } loading={'lazy'} alt={ 'basketIcon' }/>
          { productCount }
        </div> )
      }
    </>
  );
});

export default BasketLink;
