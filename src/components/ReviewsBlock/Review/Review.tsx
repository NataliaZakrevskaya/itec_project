import React from 'react';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from '../ReviewsBlock.module.scss';

const Review = ( props: ReviewPropsType ) => {
  return (
    <div className={style.reviewContainer}>
      <h3 className={style.reviewsBlockSubTitle}>{ props.nameAuthor }</h3>
      <p className={style.reviewsBlockText}>{ props.bodyOfComment }</p>
      <div className={style.reviewsBlockWrapper}>
        <div className={style.reviewsBlockPhoneWrapper}>
          <img src={ phoneIcon } alt="phoneIcon"/>
          <p>{ props.phoneNumber }</p>
        </div>
        <p>Питомец: { props.nameAnimal }</p>
      </div>
    </div>
  );
};

export default Review;

type ReviewPropsType = {
  nameAuthor: string,
  bodyOfComment: string,
  phoneNumber: string,
  nameAnimal: string
}

