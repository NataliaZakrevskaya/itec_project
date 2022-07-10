import React from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import style from './LatestBlock.module.scss';
import { getProductItems } from '../../mocks';

const LatestBlock = () => {

  const latestProducts = getProductItems();//todo запрос на новые продукты
  const navigate = useNavigate();
  const goToLatestProducts = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход с сортировкой по дате добавления
  };
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