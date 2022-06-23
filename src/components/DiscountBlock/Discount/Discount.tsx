import React from 'react';
import style from './Discount.module.scss';

const Discount = ( { img, title }: DiscountPropsType ) => {
  return (
    <div className={ style.discount }>
      <div className={style.titlePart}>
        <p>{ title }</p>
        <button>Перейти к выбору товара</button>
      </div>
      <div className={ style.imgWrapper }>
        <img src={ img } alt="animalImg"/>
      </div>
    </div>
  );
};

export default Discount;

type DiscountPropsType = {
  title: string,
  img: string
}