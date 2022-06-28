import React from 'react';
import { getProductItems } from '../../mocks';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';

const PreviouslyProductsBlock = () => {

  const previouslyProducts = getProductItems().filter( ( item, index ) => index < 4 ); // получать продукты из локал сторэдж
  const navigate = useNavigate();
  const goToProductsCatalog = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход на страницу каталога
  };

  return (
    <ThemeBlockWrapper
      title={ 'Ранее вы смотрели' }
      onButtonClick={ goToProductsCatalog }
      itemsForBlock={ previouslyProducts }
      blockTheme={ light }
    />
  );
};

export default PreviouslyProductsBlock;