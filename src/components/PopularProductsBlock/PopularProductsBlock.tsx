import React, { ReactElement, useEffect } from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';
import style from './PopularProductsBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimalTypes, getChosenAnimalTypeId } from '../../redux/selectors/animalTypes';
import { getPopularProducts } from '../../redux/selectors/popularProducts';
import { fetchPopularProductsTC } from '../../redux/reducers/popularProducts';
import { location, selectValues } from '../../enums';
import { AppDispatch } from '../../redux/store';
import { setChosenOrdering } from '../../redux/reducers/ordering';
import { PopularProductsBlockPropsType } from './types';

const PopularProductsBlock = React.memo( ( { fromCatalog }: PopularProductsBlockPropsType ): ReactElement => {

  const popularProducts = useSelector( getPopularProducts );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const animalTypes = useSelector( getAnimalTypes );
  const chosenAnimalTypeName = chosenAnimalTypeId ? animalTypes.filter( type => type.id === chosenAnimalTypeId )[ 0 ].name : null;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const goToPopularProducts = () => {
    dispatch( setChosenOrdering( { ordering: selectValues.POPULARITY } ) );
    navigate( routesPathsEnum.CATALOG );
  };
  useEffect( () => {
    dispatch( fetchPopularProductsTC( { ordering: selectValues.POPULARITY, animal: chosenAnimalTypeId } ) );
  }, [ chosenAnimalTypeId, dispatch ] );

  return (
    <div className={ style.popularProductsWrapper }>
      <ThemeBlockWrapper
        title={ chosenAnimalTypeName ? `${chosenAnimalTypeName} - популярные товары` : 'Популярные товары' }
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