import React, { useEffect } from 'react';
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

const PopularProductsBlock = ( { fromCatalog }: PopularProductsBlockPropsType ) => {

  const popularProducts = useSelector( getPopularProducts );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const ordering = selectValues.POPULARITY;
  const goToPopularProducts = () => {
    dispatch( setChosenOrdering( { ordering } ) );
    navigate( routesPathsEnum.CATALOG );
  };
  const animal = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( animal );

  useEffect( () => {
    if ( !window.localStorage.getItem( 'popularProducts' ) ) {
      dispatch( fetchPopularProductsTC( { ordering, animal } ) );
    }
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
};

export default PopularProductsBlock;

type PopularProductsBlockPropsType = {
  fromCatalog: boolean
}