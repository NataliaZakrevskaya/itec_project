import React from 'react';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import style from './ProductPage.module.scss';
import { WithThisProductBuyBlock } from '../../components/WithThisProductBuy/WithThisProductBuyBlock';

const ProductPage = () => {
  return (
    <div className={ style.productPage }>
      <PopularProductsBlock/>
      <WithThisProductBuyBlock />
      <UsefulArticlesBlock/>
    </div>
  );
};

export default ProductPage;