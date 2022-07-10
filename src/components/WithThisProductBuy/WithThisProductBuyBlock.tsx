import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { getProductItems } from '../../mocks';

export const WithThisProductBuyBlock = () => {
  const commonProducts = getProductItems(); //todo запрос на популярные продукты
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