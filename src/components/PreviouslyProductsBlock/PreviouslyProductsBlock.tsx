import React from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';
import style from './PreviouslyProductsBlock.module.scss';
import { location } from '../../enums';
import { PreviouslyProductsBlockPropsType } from './types';

const PreviouslyProductsBlock = ( { products }: PreviouslyProductsBlockPropsType ) => {
  return (
    <div className={ style.blockMargin }>
      <ThemeBlockWrapper
        title={ 'Ранее вы смотрели' }
        onButtonClick={ () => false }
        itemsForBlock={ products }
        blockTheme={ light }
        from={ location.PREVIOUSLY_PRODUCTS }
        withoutButton={ true }
      />
    </div>
  );
};

export default PreviouslyProductsBlock;