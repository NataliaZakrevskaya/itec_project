import commonStyle from '../../styles/common/Container.module.scss';
import colorStyle from '../../styles/common/LightBlock.module.scss';
import style from './ReviewsBlock.module.scss';
import PrevSectionButton from '../common/prevSectionButton/prevSectionButton';
import NextSectionButton from '../common/nextSectionButton/nextSectionButton';
import Review from './Review/Review';
import React, { useEffect, useState } from 'react';
import themeStyle from '../../styles/common/DarkBlock.module.scss';
import buttonStyle from '../../styles/common/BigButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../redux/selectors/reviews';
import { fetchReviewsTC } from '../../redux/reducers/reviews';
import { useCarousel } from '../../customHooks/useCarousel';
import Modal from '../common/modals/Modal';
import ReviewModal from '../common/modals/ReviewModal/ReviewModal';
import SuccessReviewModal from '../common/modals/SuccessReviewModal/SuccessReviewModal';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { BlockNames } from '../../customHooks/enums';
import { AppDispatch } from '../../redux/store';
import { getSendingReviewsRequestStatus } from '../../redux/selectors/app';
import { setSendingReviewRequestStatus } from '../../redux/reducers/app';
import { RequestStatus } from '../../redux/reducers/enums';

const ReviewsBlock = React.memo(() => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const reviews = useSelector( getReviews );

  const {
    windowElRef,
    offset,
    isPrevDisabled,
    onNextSectionButtonClick,
    onPrevSectionButtonClick,
    isNextDisabled,
    onTouchStart,
    onTouchEnd,
    width,
  } = useCarousel( BlockNames.REVIEWS, reviews.length );

  const [ isReviewModalActive, setIsReviewModalActive ] = useState<boolean>( false );
  const isSuccessReview = useSelector( getSendingReviewsRequestStatus ) === RequestStatus.SUCCEEDED;
  const getCurrentReviewPage = ( offset: number, width: number ) => {
    if ( offset === 0 ) return 1;
    else return ( Math.abs( offset ) / width ) + 1;
  };
  const currentReviewNumber = getCurrentReviewPage( offset, width );

  const closeReviewModal = () => {
    setIsReviewModalActive( false );
  };
  const openReviewModal = () => {
    setIsReviewModalActive( true );
  };
  const closeSuccessReviewModal = () => {
    dispatch( setSendingReviewRequestStatus( { status: RequestStatus.IDLE } ) );
    navigate( routesPathsEnum.CATALOG );
  };

  useEffect( () => {
    dispatch( fetchReviewsTC() );
  }, [] );
  useEffect( () => {
    if ( isReviewModalActive || isSuccessReview ) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [ isReviewModalActive, isSuccessReview ] );

  return (
    <div className={ `${ commonStyle.block } ${ themeStyle.block }` }>
      <div className={ commonStyle.container }>
        <div className={ style.reviewsBlock }>
          <h2 className={ style.reviewsBlockTitle }>Отзывы о магазине</h2>
          <div className={ style.reviewsContainer }>
            <div
              className={ style.window }
              ref={ windowElRef }
              onTouchStart={ onTouchStart }
              onTouchEnd={ onTouchEnd }
            >
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
              <p>{ currentReviewNumber } из { reviews.length }</p>
              <NextSectionButton disabled={ isNextDisabled } onClick={ onNextSectionButtonClick }/>
            </div>
          </div>
          <button className={ buttonStyle.bigButton } onClick={ openReviewModal }>Оставить свой отзыв</button>
        </div>
      </div>
      { isReviewModalActive &&
        <Modal closeModal={ closeReviewModal }>
          <ReviewModal closeModal={ closeReviewModal }/>
        </Modal>
      }
      { isSuccessReview &&
        <Modal closeModal={ closeSuccessReviewModal }>
          <SuccessReviewModal closeModal={ closeSuccessReviewModal }/>
        </Modal>
      }
    </div>
  );
});

export default ReviewsBlock;