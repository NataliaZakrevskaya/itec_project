import React, { useEffect } from 'react';
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

const ArticlesPage = () => {

  const articles = useSelector( getArticles );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForArticlesBlock( chosenAnimalTypeId );

  const dispatch = useDispatch();

  useEffect( () => {
    // @ts-ignore
    dispatch(fetchArticlesTC())
  }, [] );

  return (
    <div className={ style.articlesPageBlock }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p>Главная</p>
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
        <button onClick={ () => alert( 'Позже юужет раскрывать список' ) }>Показать ещё</button>
      </div>
      <PopularProductsBlock/>
      <ContactBlock/>
    </div>
  );
};

export default ArticlesPage;