import React from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';
import style from './PopularProductsBlock.module.css';
import { useSelector } from 'react-redux';
import { getTitleForProductsBlock } from '../../helpers/getTitle';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getProductItems } from '../../mocks';

const PopularProductsBlock = () => {

  const popularProducts = getProductItems(); //todo запрос на популярные продукты
  const navigate = useNavigate();
  const goToPopularProducts = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход с сортировкой по популярности
  };
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( chosenAnimalTypeId );

  return (
    <div className={ style.popularProductsWrapper }>
      <ThemeBlockWrapper
        title={ `Популярные товары ${ subTitle }` }
        onButtonClick={ goToPopularProducts }
        itemsForBlock={ popularProducts }
        blockTheme={ dark }
      />
    </div>
  );
};

export default PopularProductsBlock;