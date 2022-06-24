import React from 'react';
import AnimalsTypesList from '../../components/AnimalsTypesList/AnimalsTypesList';
import DiscountBlock from '../../components/DiscountBlock/DiscountBlock';
import PopularBrandsBlock from '../../components/PopularBrandsBlock/PopularBrandsBlock';
import ReviewsBlock from '../../components/ReviewsBlock/ReviewsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import ContactBlock from '../../components/ContactBlock/ContactBlock';
import style from './MainPage.module.scss';
import LatestBlock from '../../components/LatestBlock/LatestBlock';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';


const MainPage = () => {



  return (
    <div className={ style.mainPage }>
      <AnimalsTypesList/>
      Рекламный баннер
      <PopularProductsBlock/>
      <DiscountBlock/>
      <LatestBlock/>
      <PopularBrandsBlock/>
      <ReviewsBlock/>
      <UsefulArticlesBlock/>
      Рекламный баннер
      <ContactBlock/>
    </div>
  );
};

export default MainPage;