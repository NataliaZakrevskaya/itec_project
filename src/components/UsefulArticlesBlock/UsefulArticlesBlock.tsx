import React, { useEffect } from 'react';
import Article from '../common/Article/Article';
import style from './UsefulArticlesBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import PrevSectionButton from '../common/prevSectionButton/prevSectionButton';
import NextSectionButton from '../common/nextSectionButton/nextSectionButton';
import themeStyle from '../../styles/common/DarkBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getTitleForArticlesBlock } from '../../helpers/getTitle';
import { getArticles } from '../../redux/selectors/articles-selectors';
import { fetchArticlesTC } from '../../redux/reducers/articles-reducer';
import { useCarousel } from '../../customHooks/useCarousel';

const UsefulArticlesBlock = () => {

  const articles = useSelector( getArticles );
  const navigate = useNavigate();
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForArticlesBlock( chosenAnimalTypeId );
  const dispatch = useDispatch();

  const pagesCount = articles.length / 4;
  const {
    offset,
    isPrevDisabled,
    isNextDisabled,
    onNextSectionButtonClick,
    onPrevSectionButtonClick,
    windowElRef,
  } = useCarousel( pagesCount );

  useEffect( () => {
    // @ts-ignore
    dispatch( fetchArticlesTC() );
  }, [] );

  return (
    <div className={ `${ commonStyle.block } ${ themeStyle.block }` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>{ `Полезные статьи ${ subTitle }` }</h2>
          <div className={ `${ commonStyle.sectionsBlock } ${ themeStyle.sectionsBlock }` }>
            <PrevSectionButton disabled={ isPrevDisabled } onClick={ onPrevSectionButtonClick }/>
            <NextSectionButton disabled={ isNextDisabled } onClick={ onNextSectionButtonClick }/>
          </div>
        </div>
        <div className={ style.articlesContainer }>
          <div className={ style.window } ref={ windowElRef }>
            <div className={ style.allArticlesItemsContainer }
                 style={ {
                   transform: `translateX(${ offset }px)`,
                 } }>
              {
                articles.map( article => {
                  const { id, title, description, date_added, image, time_read } = { ...article };
                  return ( <Article
                      key={ id }
                      id={ id }
                      image={ image }
                      title={ title }
                      description={ description }
                      date_added={ date_added }
                      timeForReading={ time_read }
                    />
                  );
                } )
              }
            </div>
          </div>
        </div>
        <Button title={ 'Смотреть больше статей' } onClick={ () => navigate( routesPathsEnum.ARTICLES ) }/>
      </div>
    </div>
  );
};

export default UsefulArticlesBlock;