import React, { useEffect } from 'react';
import AnimalsTypesList from '../../components/AnimalsTypesList/AnimalsTypesList';
import PopularBrandsBlock from '../../components/PopularBrandsBlock/PopularBrandsBlock';
import ReviewsBlock from '../../components/ReviewsBlock/ReviewsBlock';
import UsefulArticlesBlock from '../../components/UsefulArticlesBlock/UsefulArticlesBlock';
import ContactBlock from '../../components/ContactBlock/ContactBlock';
import style from './MainPage.module.scss';
import LatestBlock from '../../components/LatestBlock/LatestBlock';
import PopularProductsBlock from '../../components/PopularProductsBlock/PopularProductsBlock';
import GreetingBlock from '../../components/GreetingBlock/GreetingBlock';
import { AdvertisingBlock } from '../../components/AdvertisingBlock/AdvertisingBlock';
import DiscountBlock from '../../components/DiscountBlock/DiscountBlock';
import { fetchArticlesTC } from '../../redux/reducers/articles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { getArticles } from '../../redux/selectors/articles';

const MainPage = React.memo( () => {
  const dispatch = useDispatch<AppDispatch>();
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const articlesFromStore = useSelector( getArticles );
  useEffect( () => {
    const chosenAnimalId = chosenAnimalTypeId ? chosenAnimalTypeId : null;
    dispatch( fetchArticlesTC( { chosenAnimalId } ) );
  }, [ dispatch, chosenAnimalTypeId ] );
  return (
    <div className={ style.mainPage }>
      <AnimalsTypesList/>
      <AdvertisingBlock/>
      <DiscountBlock/>
      <PopularProductsBlock fromCatalog={ false }/>
      <LatestBlock/>
      <PopularBrandsBlock/>
      <ReviewsBlock/>
      { !!articlesFromStore.length && <UsefulArticlesBlock/> }
      <GreetingBlock/>
      <ContactBlock/>
    </div>
  );
} );

export default MainPage;