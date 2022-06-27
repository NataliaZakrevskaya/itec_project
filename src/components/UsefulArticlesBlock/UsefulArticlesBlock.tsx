import React from 'react';
import { getArticles } from '../../mocks';
import Article from '../common/Article/Article';
import style from './UsefulArticlesBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import PrevSectionButton from '../common/prevSectionButton/prevSectionButton';
import NextSectionButton from '../common/nextSectionButton/nextSectionButton';
import themeStyle from '../../styles/common/DarkBlock.module.scss';

const UsefulArticlesBlock = () => {

  const articles = getArticles().filter( ( article, index ) => index < 3 );
  const navigate = useNavigate();

  return (
    <div className={ `${commonStyle.block} ${themeStyle.block}` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>Полезные статьи</h2> {/*//todo будет зависить от выбранного типа животного*/}
          <div className={ `${commonStyle.sectionsBlock} ${themeStyle.sectionsBlock}` }>
            <PrevSectionButton onClick={() => alert( 'prev' )} />
            <NextSectionButton onClick={() => alert( 'next' )} />
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