import React from 'react';
import { getArticles } from '../../mocks';
import Article from '../common/Article/Article';
import style from './UsefulArticlesBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import prevIcon from '../../Images/prevIcon.svg';
import nextIcon from '../../Images/nextIcon.svg';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';

const UsefulArticlesBlock = () => {

  const articles = getArticles().filter( ( article, index ) => index < 3 );
  const navigate = useNavigate();

  return (
    <div className={ commonStyle.block }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>Полезные статьи</h2>
          <div className={ commonStyle.sectionsBlock }>
            <div onClick={ () => alert( 'prev' ) }>
              <img src={ prevIcon } alt="prevIcon"/>
            </div>
            <div onClick={ () => alert( 'next' ) }>
              <img src={ nextIcon } alt="nextIcon"/>
            </div>
          </div>
        </div>
        <div className={ style.articles }>
          {
            articles.map( article => {
              const { id, img, title, description, date, timeForReading } = { ...article };
              return ( <Article
                  key={ id }
                  id={ id }
                  img={ img }
                  title={ title }
                  description={ description }
                  date={ date }
                  timeForReading={ timeForReading }
                />
              );
            } )
          }
        </div>
        <Button title={'Смотреть больше статей' } onClick={() => navigate(routesPathsEnum.ARTICLES)}/>
      </div>
    </div>
  );
};

export default UsefulArticlesBlock;