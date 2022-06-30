import commonStyle from '../../styles/common/Container.module.scss';
import colorStyle from '../../styles/common/LightBlock.module.scss';
import style from './ReviewsBlock.module.scss';
import PrevSectionButton from '../common/prevSectionButton/prevSectionButton';
import NextSectionButton from '../common/nextSectionButton/nextSectionButton';
import { getReviews } from '../../mocks';
import Review from './Review/Review';

const ReviewsBlock = () => {

  const reviews = getReviews();

  return (
    <div className={ commonStyle.container }>
      <div className={ style.reviewsBlock }>
        <h2 className={style.reviewsBlockTitle}>Отзывы о магазине</h2>
        <Review
          key={ reviews[ 0 ].id }
          id={ reviews[ 0 ].id }
          name={ reviews[ 0 ].name }
          reviewText={ reviews[ 0 ].reviewText }
          phoneNumber={ reviews[ 0 ].phoneNumber }
          petsName={ reviews[ 0 ].petsName }
        />


        <div className={ `${ commonStyle.sectionsBlock } ${ colorStyle.sectionsBlock }` }>
          <PrevSectionButton onClick={ () => alert( 'prev review' ) }/>
          <p>1 из 9</p> {/*// todo пока заглушкаБ можно не стилизовать*/ }
          <NextSectionButton onClick={ () => alert( 'next review' ) }/>
        </div>
      </div>
    </div>
  );
};

export default ReviewsBlock;