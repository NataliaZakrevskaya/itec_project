import React from 'react';
import { ReviewsType } from '../../../mocks';
import phoneIcon from '../../../Images/phoneIcon.svg';

const Review = ( { id, name, reviewText, phoneNumber, petsName }: ReviewsType ) => {
  return (
    <div>
      <h3>{ name }</h3>
      <p>{ reviewText }</p>
      <div>
        <div>
          <img src={ phoneIcon } alt="phoneIcon"/>
          <p>{ phoneNumber }</p>
        </div>
        <p>Питомец: { petsName }</p>
      </div>
    </div>
  );
};

export default Review;

