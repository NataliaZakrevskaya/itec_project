import grayClock from '../../../Images/grayClock.svg';
import calendarIcon from '../../../Images/calendarIcon.svg';
import style from './Article.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../routes/enums';
import { getCurrentAddedDate } from '../../../helpers/getDate';
import { stringCutter } from '../../../helpers/stringCutter';
import { ArticlePropsType } from './types';
import React, { ReactElement } from 'react';

const Article = React.memo(( {
                    id,
                    description,
                    title,
                    date_added,
                    timeForReading,
                    image,
                    forArticlesPage,
                  }: ArticlePropsType ): ReactElement => {

  const navigate = useNavigate();
  const date = new Date( date_added );
  const currentData = getCurrentAddedDate( date );
  const onArticleClick = () => {
    navigate( `${ routesPathsEnum.ARTICLES }/${ id }` );
  };

  return (
    <div
      className={ forArticlesPage ? style.articleForPage : style.article }
      onClick={ onArticleClick }
    >
      <div className={ style.articleImageWrapper }>
        <img src={ image } loading={'lazy'} alt="article" draggable="false"/>
      </div>
      <h2>{ title }</h2>
      <p dangerouslySetInnerHTML={ { __html: stringCutter( description, 160 ) } }/>
      <div className={ style.articleInfo }>
        <div>
          <img src={ grayClock } loading={'lazy'} alt="timeIcon" draggable="false"/>
          <p>Время чтения: { timeForReading }</p>
        </div>
        <div>
          <img src={ calendarIcon } loading={'lazy'} alt="calendar" draggable="false"/>
          <p>{ currentData }</p>
        </div>
      </div>
    </div>
  );
});

export default Article;