import { useLocation } from 'react-router-dom';
import { ReactElement, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { getActualPage } from '../../../redux/selectors/products';
import { getChosenProductTypeId } from '../../../redux/selectors/productTypes';
import { getChosenBrandsId } from '../../../redux/selectors/brands';
import { getChosenAnimalTypeId } from '../../../redux/selectors/animalTypes';
import { getChosenOrdering } from '../../../redux/selectors/ordering';

export const Wrapper = ( { children }: any ): ReactElement => {
  const location = useLocation();
  const pageNumber = useSelector( getActualPage );
  const chosenProductTypeId = useSelector( getChosenProductTypeId );
  const chosenBrandsId = useSelector( getChosenBrandsId );
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const chosenOrderingId = useSelector( getChosenOrdering );
  useLayoutEffect( () => {
    document.documentElement.scrollTo( 0, 100 );
  }, [ location.pathname, pageNumber, chosenProductTypeId, chosenBrandsId, chosenAnimalTypeId, chosenOrderingId ] );
  return children;
};