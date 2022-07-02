import React from 'react';
import { ReviewsType } from '../../../mocks';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from '../ReviewsBlock.module.scss'

const Review = ( { id, name, reviewText, phoneNumber, petsName }: ReviewsType ) => {
  return (
    <div className={style.reviewContainer}>
      <h3 className={style.reviewsBlockSubTitle}>{ name }</h3>
      <p className={style.reviewsBlockText}>{ reviewText }</p>
      <div className={style.reviewsBlockWrapper}>
        <div className={style.reviewsBlockPhoneWrapper}>
          <img src={ phoneIcon } alt="phoneIcon"/>
          <p>{ phoneNumber }</p>
        </div>
        <p>Питомец: { petsName }</p>
      </div>
    </div>
  );
};

export default Review;

