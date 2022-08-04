import React from 'react';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import ContactBlock from '../../components/ContactBlock/ContactBlock';
import { useNavigate, useParams } from 'react-router-dom';
import style from './ArticlePage.module.scss';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import colorTimeIcon from '../../Images/colorTimeIcon.svg';
import colorCalendarIcon from '../../Images/colorCalendarIcon.svg';
import commonStyle from '../../styles/common/Container.module.scss';
import { useSelector } from 'react-redux';
import { getArticles } from '../../redux/selectors/articles-selectors';
import { routesPathsEnum } from '../../routes/enums';
import { getCurrentAddedDate } from '../../helpers/getDate';

const ArticlePage = () => {
  const articleId = Number( useParams().articleId ) - 1;
  const article = useSelector( getArticles )[ articleId ];
  const date = new Date( article.date_added );
  const currentData = getCurrentAddedDate(date)
  const navigate = useNavigate();
  return (
    <div className={ style.articlePage }>
      <div className={ commonStyle.container }>
        <div className={ navigationStyle.navigationBlock }>
          <div className={ navigationStyle.navigationBlockWrapper }>
            <p onClick={() => navigate(routesPathsEnum.MAIN)}>Главная</p>
            <img src={ nextIcon } alt="nextIcon"/>
            <p onClick={() => navigate(routesPathsEnum.ARTICLES)}>Статьи</p>
            <img src={ nextIcon } alt="nextIcon"/>
            <p>{ article.title }</p>
          </div>
        </div>
        <div className={ style.articleTitle }>
          <h1>{ article.title }</h1>
        </div>
        <div className={ style.articleInfo }>
          <div className={ style.articleReadingWrapper }>
            <div>
              <img src={ colorTimeIcon } alt="timeIcon"/>
              <p>Время чтения: { article.time_read } мин.</p>
            </div>
            <div>
              <img src={ colorCalendarIcon } alt="calendar"/>
              <p>{ currentData }</p>
            </div>
          </div>
        </div>
        <div className={ style.articleImage }>
          <img src={ article.image } alt="article"/>
        </div>
        <div className={ style.articleTextContainer }>
          <p className={ style.articleText }>С появлением кошки в доме нужно организовать все бытовые условия для ее
            комфортного существования:
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
      <PopularProductsBlock fromCatalog={false}/>
      <ContactBlock/>
    </div>
  );
};

export default ArticlePage;