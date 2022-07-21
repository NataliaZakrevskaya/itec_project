import React, { useEffect } from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import style from './LatestBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestProducts } from '../../redux/selectors/latestProducts-selectors';
import { fetchLatestProductsTC } from '../../redux/reducers/latestProducts-reducer';
import { selectValues } from '../../Api/productsApi/enums';

const LatestBlock = () => {

  const latestProducts = useSelector( getLatestProducts )
  const ordering = selectValues.ADDED_DATE;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLatestProducts = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход с сортировкой по дате добавления
  };

  useEffect( () => {
    // @ts-ignore
    dispatch( fetchLatestProductsTC( { ordering } ) );
  }, [] );
  return (
    <div className={ style.latestBlockWrapper }>
      <ThemeBlockWrapper
        title={ 'Новинки' }
        onButtonClick={ goToLatestProducts }
        itemsForBlock={ latestProducts }
        blockTheme={ light }
      />
    </div>
  );
};

export default LatestBlock;