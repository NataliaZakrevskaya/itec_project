import React, { useCallback, useEffect, useState } from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';
import style from './PopularProductsBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTitleForProductsBlock } from '../../helpers/getTitle';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getPopularProducts } from '../../redux/selectors/popularProducts-selectors';
import { fetchPopularProductsTC } from '../../redux/reducers/popularProducts-reducer';
import { selectValues } from '../../Api/productsApi/enums';
import { location } from '../../enums';
import { AppDispatch } from '../../redux/store';
import { setChosenOrdering } from '../../redux/reducers/ordering-reducer';
import { PopularProductsBlockPropsType } from './types';

const PopularProductsBlock = React.memo( ( { fromCatalog }: PopularProductsBlockPropsType ) => {

  const popularProducts = useSelector( getPopularProducts );
  const animal = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( animal );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const goToPopularProducts =  () => {
    dispatch( setChosenOrdering( { ordering: selectValues.POPULARITY } ) );
    navigate( routesPathsEnum.CATALOG );
  };
  useEffect( () => {
    dispatch( fetchPopularProductsTC( { ordering: selectValues.POPULARITY, animal } ) );
  }, [ animal ] );

  return (
    <div className={ style.popularProductsWrapper }>
      <ThemeBlockWrapper
        title={ `Популярные товары ${ subTitle }` }
        onButtonClick={ goToPopularProducts }
        itemsForBlock={ popularProducts }
        blockTheme={ dark }
        from={ location.POPULAR_PRODUCTS }
        withoutButton={ fromCatalog }
      />
    </div>
  );
} );

export default PopularProductsBlock;