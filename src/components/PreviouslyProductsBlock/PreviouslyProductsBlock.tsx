import React, { useCallback, useState } from 'react';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import light from '../../styles/common/LightBlock.module.scss';
import style from './PreviouslyProductsBlock.module.scss';
import { location } from '../../enums';
import { PreviouslyProductsBlockPropsType } from './types';

const PreviouslyProductsBlock = ( { products }: PreviouslyProductsBlockPropsType ) => {
  const [ productsList, setProductsList ] = useState( products );
  const onButtonClick = useCallback( () => false, [] );
  return (
    <div className={ style.blockMargin }>
      <ThemeBlockWrapper
        title={ 'Ранее вы смотрели' }
        onButtonClick={ onButtonClick }
        itemsForBlock={ productsList }
        blockTheme={ light }
        from={ location.PREVIOUSLY_PRODUCTS }
        withoutButton={ true }
      />
    </div>
  );
};

export default PreviouslyProductsBlock;