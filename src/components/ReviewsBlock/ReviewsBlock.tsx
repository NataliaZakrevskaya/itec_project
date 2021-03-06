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
import { getReviews } from '../../redux/selectors/reviews-selectors';
import { fetchReviewsTC } from '../../redux/reducers/reviews-reducer';
import { useCarousel } from '../../customHooks/useCarousel';
import Modal from '../common/modals/Modal';
import ReviewModal from '../common/modals/ReviewModal/ReviewModal';
import SuccessReviewModal from '../common/modals/SuccessReviewModal/SuccessReviewModal';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { BlockNames } from '../../customHooks/enums';
import { AppDispatch } from '../../redux/store';
import { getSendingReviewsRequestStatus } from '../../redux/selectors/app-selectors';
import { setSendingReviewRequestStatus } from '../../redux/reducers/app-reducer';
import { RequestStatus } from '../../redux/reducers/enums';

const ReviewsBlock = () => {

  const reviews = useSelector( getReviews );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

  const closeReviewModal = () => {
    setIsReviewModalActive( false );
  };
  const openReviewModal = () => {
    setIsReviewModalActive( true );
  };
  const closeSuccessReviewModal = () => {
    dispatch(setSendingReviewRequestStatus({status: RequestStatus.IDLE}))
    navigate( routesPathsEnum.CATALOG );
  };

  useEffect( () => {
    dispatch( fetchReviewsTC() );
  }, [] );

  const getCurrentReviewPage = ( offset: number, width: number ) => {
    if ( offset === 0 ) return 1;
    if ( offset === -width ) return 2;
    if ( offset === -( width * 2 ) ) return 3;
    if ( offset === -( width * 3 ) ) return 4;
  };

  const currentReviewNumber = getCurrentReviewPage( offset, width );

  return (
    <div className={ `${ commonStyle.block } ${ themeStyle.block }` }>
      <div className={ commonStyle.container }>
        <div className={ style.reviewsBlock }>
          <h2 className={ style.reviewsBlockTitle }>???????????? ?? ????????????????</h2>
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
              <p>{ currentReviewNumber } ???? { 3 }</p>
              <NextSectionButton disabled={ isNextDisabled } onClick={ onNextSectionButtonClick }/>
            </div>
          </div>
          <button className={ buttonStyle.bigButton } onClick={ openReviewModal }>???????????????? ???????? ??????????</button>
        </div>
      </div>
      { isReviewModalActive &&
        <Modal closeModal={ closeReviewModal }>
          <ReviewModal closeModal={ closeReviewModal }/>
        </Modal>
      }
      { isSuccessReview &&
        <Modal closeModal={ closeReviewModal }>
          <SuccessReviewModal closeModal={ closeSuccessReviewModal }/>
        </Modal>
      }
    </div>
  );
};

export default ReviewsBlock;