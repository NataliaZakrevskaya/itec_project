import React, { ReactElement } from 'react';
import style from './Discount.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';
import { DiscountPropsType } from '../types';

const Discount = React.memo(( { img, title, background }: DiscountPropsType ): ReactElement => {

  const navigate = useNavigate();

  return (
    <div className={ style.discount } style={{background: `${background}`}}>
      <div className={ style.titlePart }>
        <p>{ title }</p>
        <button onClick={ () => navigate( routesPathsEnum.CATALOG ) }>Перейти к выбору товара</button>
      </div>
      <div className={ style.discountImageWrapper }>
        <img src={ img } loading={'lazy'} alt="animalImg" draggable="false"/>
      </div>
    </div>
  );
});

export default Discount;

