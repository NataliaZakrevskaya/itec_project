import React from 'react';
import style from './Discount.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';
import { DiscountPropsType } from '../types';

const Discount = ( { img, title, background }: DiscountPropsType ) => {

  const navigate = useNavigate();

  return (
    <div className={ style.discount } style={{background: `${background}`}}>
      <div className={ style.titlePart }>
        <p>{ title }</p>
        <button onClick={ () => navigate( routesPathsEnum.CATALOG ) }>Перейти к выбору товара</button>
      </div>
      <div className={ style.discountImageWrapper }>
        <img src={ img } loading={'lazy'} alt="animalImg"/>
      </div>
    </div>
  );
};

export default Discount;

