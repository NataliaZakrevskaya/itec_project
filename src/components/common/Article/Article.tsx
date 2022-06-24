import { ArticleType } from '../../../mocks';
import timeIcon from '../../../Images/timeIcon.svg';
import calendarIcon from '../../../Images/calendarIcon.svg';
import style from './Article.module.scss';

const Article = ( { id, img, description, title, date, timeForReading }: ArticleType ) => {
  return (
    <div className={ style.article }>
      <img src={ img } alt="article"/>
      <h6>{ title }</h6>
      <p>{ description }</p>
      <div className={ style.articleInfo }>
        <div>
          <img src={ timeIcon } alt="timeIcon"/>
          <p>Время чтения: { timeForReading } мин.</p>
        </div>
        <div>
          <img src={ calendarIcon } alt="calendar"/>
          <p>{ date }</p>
        </div>
      </div>
    </div>
  );
};

export default Article;