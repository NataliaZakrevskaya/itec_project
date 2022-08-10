import React from 'react';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from '../ReviewsBlock.module.scss';
import { ReviewPropsType } from './types';

const Review = ( { nameAuthor, bodyOfComment, phoneNumber, nameAnimal }: ReviewPropsType ) => {
  return (
    <div className={ style.reviewContainer }>
      <h3 className={ style.reviewsBlockSubTitle }>{ nameAuthor }</h3>
      <p className={ style.reviewsBlockText }>{ bodyOfComment }</p>
      <div className={ style.reviewsBlockWrapper }>
        <div className={ style.reviewsBlockPhoneWrapper }>
          <img src={ phoneIcon } alt="phoneIcon"/>
          <p>{ phoneNumber }</p>
        </div>
        <p>Питомец: { nameAnimal }</p>
      </div>
    </div>
  );
};

export default Review;



