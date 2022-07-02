import React from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { getProductItems } from '../../mocks';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';
import style from './PopularProductsBlock.module.css'

const PopularProductsBlock = () => {

  const popularProducts = getProductItems(); //todo запрос на популярные продукты
  const navigate = useNavigate();
  const goToPopularProducts = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход с сортировкой по популярности
  };

  return (
      <div className={style.popularProductsWrapper}>
        <ThemeBlockWrapper
            title={ 'Популярные товары' }
            onButtonClick={ goToPopularProducts }
            itemsForBlock={ popularProducts }
            blockTheme={ dark }
        />
      </div>
  );
};

export default PopularProductsBlock;