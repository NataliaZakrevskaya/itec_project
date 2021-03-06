import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';
import style from './PreviouslyProductsBlock.module.scss';
import { location } from '../../enums';
import { ProductItemType } from '../../redux/reducers/previouslyProducts-reducer';

const PreviouslyProductsBlock = ( { products }: PreviouslyProductsBlockPropsType ) => {

  console.log(products);
  const navigate = useNavigate();
  const goToProductsCatalog = () => {
    navigate( routesPathsEnum.CATALOG ); //todo переход на страницу каталога
  };

  return (
    <div className={ style.blockMargin }>
      <ThemeBlockWrapper
        title={ 'Ранее вы смотрели' }
        onButtonClick={ goToProductsCatalog }
        itemsForBlock={ products }
        blockTheme={ light }
        from={ location.PREVIOUSLY_PRODUCTS }
      />
    </div>
  );
};

export default PreviouslyProductsBlock;

type PreviouslyProductsBlockPropsType = {
  products: Array<ProductItemType>
}