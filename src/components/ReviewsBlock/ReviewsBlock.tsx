import commonStyle from '../../styles/common/Container.module.scss';
import colorStyle from '../../styles/common/LightBlock.module.scss';
import style from './ReviewsBlock.module.scss';
import PrevSectionButton from '../common/prevSectionButton/prevSectionButton';
import NextSectionButton from '../common/nextSectionButton/nextSectionButton';
import Review from './Review/Review';
import React, { useEffect } from 'react';
import themeStyle from '../../styles/common/DarkBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../redux/selectors/reviews-selectors';
import { fetchReviewsTC } from '../../redux/reducers/reviews-reducer';
import { useCarousel } from '../../customHooks/useCarousel';

const ReviewsBlock = () => {

  const reviews = useSelector( getReviews );
  const dispatch = useDispatch();

  const pagesCount = reviews.length;
  const {
    windowElRef,
    offset,
    isPrevDisabled,
    onNextSectionButtonClick,
    onPrevSectionButtonClick,
    isNextDisabled,
  } = useCarousel( pagesCount );

  useEffect( () => {
    // @ts-ignore
    dispatch( fetchReviewsTC() );
  }, [] );

  return (
    <div className={ `${ commonStyle.block } ${ themeStyle.block }` }>
      <div className={ commonStyle.container }>
        <div className={ style.reviewsBlock }>
          <h2 className={ style.reviewsBlockTitle }>Отзывы о магазине</h2>
          <div className={ style.reviewsContainer }>
            <div className={ style.window } ref={ windowElRef }>
              <div className={ style.allReviewsItemsContainer }
                   style={ {
                     transform: `translateX(${ offset }px)`,
                   } }>
                {
                  reviews.map( review =>
                    <Review
                      key={ review.id }
                      nameAuthor={ review.name_author }
                      bodyOfComment={ review.body_of_comment }
                      phoneNumber={ review.phone_number }
                      nameAnimal={ review.name_animal }
                    />,
                  )
                }
              </div>
            </div>
          </div>
          <div className={ colorStyle.block }>
            <div className={ `${ colorStyle.sectionsBlock } ${ style.buttonsBlock }` }>
              <PrevSectionButton disabled={ isPrevDisabled } onClick={ onPrevSectionButtonClick }/>
              <p>1 из { pagesCount }</p>
              <NextSectionButton disabled={ isNextDisabled } onClick={ onNextSectionButtonClick }/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsBlock;