import React from 'react';
import { getProductItems } from '../../mocks';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';
import style from './PreviouslyProductsBlock.module.scss';

const PreviouslyProductsBlock = () => {

  const previouslyProducts = getProductItems(); // получать продукты из локал сторэдж
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