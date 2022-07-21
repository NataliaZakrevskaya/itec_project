import React, { useEffect } from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import dark from '../../styles/common/DarkBlock.module.scss';
import style from './PopularProductsBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTitleForProductsBlock } from '../../helpers/getTitle';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getPopularProducts } from '../../redux/selectors/popularProducts-selectors';
import { fetchPopularProductsTC } from '../../redux/reducers/popularProducts-reducer';
import { selectValues } from '../../Api/productsApi/enums';

const PopularProductsBlock = () => {

  const popularProducts = useSelector(getPopularProducts)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToPopularProducts = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход с сортировкой по популярности
  };
  const animal = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForProductsBlock( animal );
  const ordering = selectValues.POPULARITY

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPopularProductsTC({ordering, animal}))
  }, [animal])

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