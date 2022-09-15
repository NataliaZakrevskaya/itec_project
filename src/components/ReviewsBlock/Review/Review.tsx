import React, { ReactElement } from 'react';
import style from '../ReviewsBlock.module.scss';
import { ReviewPropsType } from './types';

const Review = React.memo( ( { nameAuthor, bodyOfComment, nameAnimal }: ReviewPropsType ): ReactElement => {
  return (
    <div className={ style.reviewContainer }>
      <h3 className={ style.reviewsBlockSubTitle }>{ nameAuthor }</h3>
      <p className={ style.reviewsBlockText }>{ bodyOfComment }</p>
      <div className={ style.reviewsBlockWrapper }>
        <p>Питомец: { nameAnimal }</p>
      </div>
    </div>
  );
} );

export default Review;



