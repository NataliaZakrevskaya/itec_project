import { ArticleType } from '../../../mocks';
import grayClock from '../../../Images/grayClock.svg';
import calendarIcon from '../../../Images/calendarIcon.svg';
import style from './Article.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';

const Article = ( { id, img, description, title, date, timeForReading }: ArticleType ) => {
  const navigate = useNavigate()
  return (
    <div className={ style.article }>
      <div className={style.articleImageWrapper}><img src={ img } alt="article"/></div>
      <h6 onClick={() => navigate(`${routesPathsEnum.ARTICLES}/${id}`)}>{ title }</h6>
      <p>{ description }</p>
      <div className={ style.articleInfo }>
        <div>
          <img src={ grayClock } alt="timeIcon"/>
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