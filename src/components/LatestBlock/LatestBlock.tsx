import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import style from './LatestBlock.module.scss';
import light from '../../styles/common/LightBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestProducts } from '../../redux/selectors/latestProducts-selectors';
import { fetchLatestProductsTC } from '../../redux/reducers/latestProducts-reducer';
import { selectValues } from '../../Api/productsApi/enums';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { location } from '../../enums';
import { AppDispatch } from '../../redux/store';
import { setChosenOrdering } from '../../redux/reducers/ordering-reducer';

const LatestBlock = React.memo( () => {

  const latestProducts = useSelector( getLatestProducts );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goToLatestProducts = () => {
    dispatch( setChosenOrdering( { ordering: selectValues.ADDED_DATE } ) );
    navigate( routesPathsEnum.CATALOG );
  };

  useEffect( () => {
    dispatch( fetchLatestProductsTC( { ordering: selectValues.ADDED_DATE } ) );
  }, [] );

  return (
    <div className={ style.latestBlockWrapper }>
      <ThemeBlockWrapper
        title={ 'Новинки' }
        onButtonClick={ goToLatestProducts }
        itemsForBlock={ latestProducts }
        blockTheme={ light }
        from={ location.LATEST_PRODUCTS }
      />
    </div>
  );
} );

export default LatestBlock;