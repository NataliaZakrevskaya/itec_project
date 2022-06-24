import React from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { getProductItems } from '../../mocks';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';

const PopularProductsBlock = () => {

  const popularProducts = getProductItems().filter( ( item, index ) => index < 4 ); //todo запрос на популярные продукты
  const navigate = useNavigate();
  const goToPopularProducts = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход с сортировкой по популярности
  };

  return (
    <ThemeBlockWrapper
      title={ 'Популярные товары' }
      onButtonClick={ goToPopularProducts }
      itemsForBlock={ popularProducts }
      blockTheme={ dark }
    />
  );
};

export default PopularProductsBlock;