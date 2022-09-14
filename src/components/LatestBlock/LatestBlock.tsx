import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import style from './LatestBlock.module.scss';
import light from '../../styles/common/LightBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestProducts } from '../../redux/selectors/latestProducts';
import { fetchLatestProductsTC } from '../../redux/reducers/latestProducts';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { location, selectValues } from '../../enums';
import { AppDispatch } from '../../redux/store';
import { setChosenOrdering } from '../../redux/reducers/ordering';

const LatestBlock = React.memo( (): ReactElement => {

  const latestProducts = useSelector( getLatestProducts );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goToLatestProducts = () => {
    dispatch( setChosenOrdering( { ordering: selectValues.ADDED_DATE } ) );
    navigate( routesPathsEnum.CATALOG );
  };

  useEffect( () => {
    dispatch( fetchLatestProductsTC( { ordering: selectValues.ADDED_DATE } ) );
  }, [dispatch] );

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