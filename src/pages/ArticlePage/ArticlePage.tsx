import React from 'react';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import ContactBlock from '../../components/ContactBlock/ContactBlock';
import { useParams } from 'react-router-dom';
import { getProductItems } from '../../mocks';

const ArticlePage = () => {
  const articleId = Number( useParams().articletId ) - 1;
  const article = getProductItems()[ articleId ]; //todo позже будет просто запрос по апи

  return (
    <div>

      <UsefulArticlesBlock/>
      <PopularProductsBlock/>
      <ContactBlock/>
    </div>
  );
};

export default ArticlePage;