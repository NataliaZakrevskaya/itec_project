import React from 'react';
import style from './BasketLink.module.scss';
import basketIcon from '../../Images/basketIcon.svg';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';

const BasketLink = () => {

  const productCount = 0; // todo позже состояние получать из стора
  const navigate = useNavigate();

  return (
    <div className={ style.basketLink } onClick={ () => navigate( routesPathsEnum.BASKET ) }>
      <img src={ basketIcon } alt={ 'basketIcon' }/>
      { productCount }
    </div>
  );
};

export default BasketLink;