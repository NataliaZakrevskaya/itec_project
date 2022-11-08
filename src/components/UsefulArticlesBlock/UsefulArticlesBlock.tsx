import React, { ReactElement, useEffect } from 'react';
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
import { getAnimalTypes, getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { getArticles } from '../../redux/selectors/articles';
import { fetchArticlesTC } from '../../redux/reducers/articles';
import { useCarousel } from '../../customHooks/useCarousel';
import { BlockNames } from '../../customHooks/enums';
import { AppDispatch } from '../../redux/store';

const UsefulArticlesBlock = React.memo( (): ReactElement => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const animalTypes = useSelector( getAnimalTypes );
  const chosenAnimalTypeName = chosenAnimalTypeId ? animalTypes.filter( type => type.id === chosenAnimalTypeId )[ 0 ].name : null;
  const articlesFromStore = useSelector( getArticles );
  const getArticlesForBlock = () => {
    if ( chosenAnimalTypeId ) {
      const articles = articlesFromStore.filter( article => article.animals === chosenAnimalTypeId );
      if ( articles.length ) {
        return articles;
      }
      return articlesFromStore;
    }
    return articlesFromStore;
  };
  const articles = getArticlesForBlock();

  const {
    offset,
    isPrevDisabled,
    isNextDisabled,
    onNextSectionButtonClick,
    onPrevSectionButtonClick,
    onTouchStart,
    onTouchEnd,
    windowElRef,
  } = useCarousel( BlockNames.ARTICLES, articles.length );

  useEffect( () => {
    dispatch( fetchArticlesTC() );
  }, [ dispatch ] );

  return (
    <div className={ `${ commonStyle.block } ${ themeStyle.block }` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>{ chosenAnimalTypeName ? `${chosenAnimalTypeName} - полезные статьи` : 'Полезные статьи' }</h2>
          <div className={ `${ commonStyle.sectionsBlock } ${ themeStyle.sectionsBlock }` }>
            <PrevSectionButton disabled={ isPrevDisabled } onClick={ onPrevSectionButtonClick }/>
            <NextSectionButton disabled={ isNextDisabled } onClick={ onNextSectionButtonClick }/>
          </div>
        </div>
        <div className={ style.articlesContainer }>
          <div
            className={ style.window }
            ref={ windowElRef }
            onTouchStart={ onTouchStart }
            onTouchEnd={ onTouchEnd }
          >
            <div
              className={ articles.length > 3 ? `${ style.allArticlesItemsContainer }` : ` ${ style.articlesLessThenFour }` }
              style={ {
                transform: `translateX(${ offset }px)`,
              } }>
              {
                articles.map( ( { id, title, description, date_added, image, time_read } ) => {
                  return ( <Article
                      key={ id }
                      id={ id }
                      image={ image }
                      title={ title }
                      description={ description }
                      date_added={ date_added }
                      timeForReading={ time_read }
                      forArticlesPage={ false }
                    />
                  );
                } )
              }
            </div>
          </div>
        </div>
        <Button title={ 'Читать больше статей' } onClick={ () => navigate( routesPathsEnum.ARTICLES ) }/>
      </div>
    </div>
  );
} );

export default UsefulArticlesBlock;