import React from 'react';
import { getProductItems } from '../../mocks';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';

export const WithThisProductBuyBlock = () => {
  const commonProducts = getProductItems().filter( ( item, index ) => index < 4 ); //todo запрос на популярные продукты
  const navigate = useNavigate();
  const goToCommonProducts = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход каталог товаров, которые покупают с этим товаром
  };
  return (
    <ThemeBlockWrapper
      title={ 'Вместе с этим товаром покупают' }
      onButtonClick={ goToCommonProducts }
      itemsForBlock={ commonProducts }
      blockTheme={ dark }
    />
  );
};