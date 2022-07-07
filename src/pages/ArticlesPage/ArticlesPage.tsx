import React from 'react';
import style from './ArticlesPage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import AnimalsTypesList from '../../components/AnimalsTypesList/AnimalsTypesList';
import { getArticles } from '../../mocks';
import Article from '../../components/common/Article/Article';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import ContactBlock from '../../components/ContactBlock/ContactBlock';
import { useSelector } from 'react-redux';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getTitleForArticlesBlock, getTitleForProductsBlock } from '../../helpers/getTitle';

const ArticlesPage = () => {

  const articlesItems = getArticles(); //todo позже будет запрос
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForArticlesBlock( chosenAnimalTypeId );

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
      <div className={style.articlesTitle}>
          <h1>{ `Полезные статьи ${subTitle}` }</h1>
      </div> {/*//todo будет меняться в зависимости от выбранного типа животного*/ }
      <div className={ style.articlesBlockContainer }>
        <div className={ style.articlesBlock }>
          {
            articlesItems.map( item =>
              <Article
                key={ item.id }
                id={ item.id }
                title={ item.title }
                description={ item.description }
                timeForReading={ item.timeForReading }
                date={ item.date }
                img={ item.img }
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