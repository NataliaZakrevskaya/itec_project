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
import GreetingBlock from '../../components/GreetingBlock/GreetingBlock';
import AdvertisingBlock from '../../components/AdvertisingBlock/AdvertisingBlock';

const MainPage = () => {

  return (
    <div className={ style.mainPage }>
        <AnimalsTypesList/>
        <AdvertisingBlock/>
        <PopularProductsBlock/>
        <DiscountBlock/>
        <LatestBlock/>
        <PopularBrandsBlock/>
        <ReviewsBlock/>
        <UsefulArticlesBlock/>
        <GreetingBlock/>
        <ContactBlock/>
    </div>
  );
};

export default MainPage;