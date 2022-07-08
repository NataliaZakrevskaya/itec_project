import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';
import style from './PreviouslyProductsBlock.module.scss';
import { useSelector } from 'react-redux';
import { getPreviouslyProductItems } from '../../redux/selectors/products-selectors';

const PreviouslyProductsBlock = () => {

  const previouslyProducts = useSelector(getPreviouslyProductItems); // получать продукты из локал сторэдж
  const navigate = useNavigate();
  const goToProductsCatalog = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход на страницу каталога
  };

  return (
    <div className={style.blockMargin}>
      <ThemeBlockWrapper
        title={ 'Ранее вы смотрели' }
        onButtonClick={ goToProductsCatalog }
        itemsForBlock={ previouslyProducts }
        blockTheme={ light }
      />
    </div>
  );
};

export default PreviouslyProductsBlock;