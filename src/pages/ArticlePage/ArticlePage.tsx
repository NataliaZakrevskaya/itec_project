import React from 'react';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import ContactBlock from '../../components/ContactBlock/ContactBlock';
import { useParams } from 'react-router-dom';
import { getArticles } from '../../mocks';
import style from './ArticlePage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import colorTimeIcon from '../../Images/colorTimeIcon.svg';
import colorCalendarIcon from '../../Images/colorCalendarIcon.svg';
import commonStyle from '../../styles/common/Container.module.scss';

const ArticlePage = () => {
  const articleId = Number( useParams().articleId ) - 1;
  const article = getArticles()[ articleId ]; //todo позже будет просто запрос по апи
  console.log( article );
  return (
    <div className={ style.articlePage }>
      <div className={ commonStyle.container }>
        <div className={ navigationStyle.navigationBlock }>
          <div className={ navigationStyle.navigationBlockWrapper }>
            <p>Главная</p>
            <img src={ nextIcon } alt="nextIcon"/>
            <p>Каталог</p>
            <img src={ nextIcon } alt="nextIcon"/>
            <p>{ article.title }</p>
          </div>
        </div>
        <h1 className={style.articleTitle}>{ article.title }</h1>
        <div className={style.articleInfo }>
          <div className={style.articleReadingWrapper}>
            <div className={style.timeToReading}>
              <img src={ colorTimeIcon } alt="timeIcon"/>
              <p>Время чтения: { article.timeForReading } мин.</p>
            </div>
            <div>
              <img src={ colorCalendarIcon } alt="calendar"/>
              <p>{ article.date }</p>
            </div>
          </div>
        </div>
        <div className={ style.articleImage }>
          <img src={ article.img } alt="article"/>
        </div>
        <div className={ commonStyle.container }>
          <p className={style.articleText}>С появлением кошки в доме нужно организовать все бытовые условия для ее комфортного существования:
            определить место для сна, подобрать посуду для кормления и, конечно же, обустроить туалет, где она сможет
            справлять свои естественные нужды.

            Для домашних кошек производители выпускают специальные лотки – удобные туалетный аксессуар, легко очищаемый
            от испражнений животного. В лоток можно засыпать специальные наполнители, нейтрализующие запах. Когда все
            необходимые аксессуары подготовлены, остается самое главное – приучить домашнего питомца ходить в туалет на
            лоток.

            В статье мы рассмотрим, как приучить кошку пользоваться лотком, особенности замены наполнителя в лотке, уход
            за кошачьим туалетом.</p>
        </div>
      </div>
      <UsefulArticlesBlock/>
      <PopularProductsBlock/>
      <ContactBlock/>
    </div>
  );
};

export default ArticlePage;