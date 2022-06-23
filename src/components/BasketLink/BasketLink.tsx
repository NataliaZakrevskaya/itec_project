import React from 'react';
import style from './BasketLink.module.scss';
import basketIcon from '../../Images/basketIcon.svg';

const BasketLink = () => {

  const productCount = 0 // todo позже состояние получать из стора

  return (
    <div className={ style.basketLink }>
      <img src={basketIcon} alt={"basketIcon"}/>
      {productCount}
    </div>
  );
};

export default BasketLink;