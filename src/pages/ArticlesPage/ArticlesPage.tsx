import React, { useEffect, useState } from 'react';
import style from './ArticlesPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import AnimalsTypesList from '../../components/AnimalsTypesList/AnimalsTypesList';
import Article from '../../components/common/Article/Article';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import ContactBlock from '../../components/ContactBlock/ContactBlock';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getTitleForArticlesBlock } from '../../helpers/getTitle';
import { getArticles } from '../../redux/selectors/articles-selectors';
import { fetchArticlesTC } from '../../redux/reducers/articles-reducer';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { AppDispatch } from '../../redux/store';

const ArticlesPage = () => {

  const [showAll, setShowAll] = useState<boolean>(false)

  const articlesFromStore = useSelector( getArticles );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const getArticlesForBlock = () => {
    if ( chosenAnimalTypeId ) {
      const articles = articlesFromStore.filter( article => article.animals === chosenAnimalTypeId );
      if(articles.length){
        if(!showAll){
          return articles.filter( (article, index) => index < 3)
        }
        return articles;
      }
      if (!showAll){
        return articlesFromStore.filter( (article, index) => index < 3)
      }
      return articlesFromStore;
    }
    if (!showAll){
      return articlesFromStore.filter( (article, index) => index < 3)
    }
    return articlesFromStore;
  };
  const articles = getArticlesForBlock();
  const subTitle = getTitleForArticlesBlock( chosenAnimalTypeId );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect( () => {
    dispatch(fetchArticlesTC())
  }, [] );

  return (
    <div className={ style.articlesPageBlock }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={() => navigate(routesPathsEnum.MAIN)}>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>Статьи</p>
        </div>
      </div>
      <AnimalsTypesList/>
      <div className={ style.articlesTitle }>
        <h1>{ `Полезные статьи ${ subTitle }` }</h1>
      </div>
      <div className={ style.articlesBlockContainer }>
        <div className={ style.articlesBlock }>
          {
            articles.map( article =>
              <Article
                key={ article.id }
                id={ article.id }
                title={ article.title }
                description={ article.description }
                timeForReading={ article.time_read }
                date_added={ article.date_added }
                image={ article.image }
              />,
            )
          }
        </div>
        {!showAll && <button onClick={ () => setShowAll(true) }>Показать ещё</button>}
      </div>
      <PopularProductsBlock fromCatalog={false}/>
      <ContactBlock/>
    </div>
  );
};

export default ArticlesPage;