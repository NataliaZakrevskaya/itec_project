import React, { ReactElement } from 'react';
import dark from '../../styles/common/DarkBlock.module.scss';
import ThemeBlockWrapper from '../common/ThemeBlockWrapper/ThemeBlockWrapper';
import { location } from '../../enums';
import { WithThisProductBuyBlockPropsType } from './types';

export const WithThisProductBuyBlock = ( { products }: WithThisProductBuyBlockPropsType ): ReactElement => {
  return (
    <ThemeBlockWrapper
      title={ 'Вместе с этим товаром покупают' }
      onButtonClick={ () => false }
      itemsForBlock={ products }
      blockTheme={ dark }
      from={ location.WITH_THIS_PRODUCT_BUY }
      withoutButton={ true }
    />
  );
};
