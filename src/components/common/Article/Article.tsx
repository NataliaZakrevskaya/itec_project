import grayClock from '../../../Images/grayClock.svg';
import calendarIcon from '../../../Images/calendarIcon.svg';
import style from './Article.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';

const Article = ( { id, description, title, date_added, timeForReading, image }: ArticlePropsType ) => {

  const navigate = useNavigate();
  return (
    <div className={ style.article }>
      <div className={ style.articleImageWrapper }>
        <img src={ image } alt="article"/>
      </div>
      <h6 onClick={ () => navigate( `${ routesPathsEnum.ARTICLES }/${ id }` ) }>{ title }</h6>
      <p dangerouslySetInnerHTML={{__html:description}}/>
      <div className={ style.articleInfo }>
        <div>
          <img src={ grayClock } alt="timeIcon"/>
          <p>Время чтения: { timeForReading }</p>
        </div>
        <div>
          <img src={ calendarIcon } alt="calendar"/>
          <p>{ date_added }</p>
        </div>
      </div>
    </div>
  );
};

export default Article;

type ArticlePropsType = {
  id: number,
  image: string,
  title: string,
  description: string,
  date_added: string,
  timeForReading: number,
}